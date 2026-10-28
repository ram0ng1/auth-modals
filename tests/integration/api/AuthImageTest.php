<?php

/*
 * This file is part of ramon/auth-modals.
 *
 * Copyright (c) 2026 Ramon Guilherme.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Ramon\AuthModals\Tests\integration\api;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use Flarum\User\User;
use Laminas\Diactoros\UploadedFile;
use Psr\Http\Message\ResponseInterface;

/**
 * Envio e remoção da imagem do painel (`/api/auth-modals/image`) e os campos
 * que o fórum lê.
 */
class AuthImageTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('ramon-auth-modals');

        $this->prepareDatabase([
            User::class => [$this->normalUser()],
        ]);
    }

    private function png(int $width = 40, int $height = 30): string
    {
        $path = (string) tempnam(sys_get_temp_dir(), 'am').'.png';
        $image = imagecreatetruecolor($width, $height);
        imagepng($image, $path);

        return $path;
    }

    private function upload(int $as, string $path, string $name, string $type): ResponseInterface
    {
        $file = new UploadedFile($path, (int) filesize($path), UPLOAD_ERR_OK, $name, $type);

        return $this->send(
            $this->request('POST', '/api/auth-modals/image', ['authenticatedAs' => $as])
                ->withUploadedFiles(['auth-modals' => $file])
        );
    }

    /** @return array<string, mixed> */
    private function forum(): array
    {
        return json_decode((string) $this->send($this->request('GET', '/api'))->getBody(), true)['data']['attributes'];
    }

    public function test_admin_envia_a_imagem_e_o_forum_recebe_o_caminho(): void
    {
        $response = $this->upload(1, $this->png(), 'fundo.png', 'image/png');

        $this->assertEquals(200, $response->getStatusCode(), (string) $response->getBody());

        $path = $this->app()->getContainer()->make(SettingsRepositoryInterface::class)->get('auth-modals.image');

        $this->assertMatchesRegularExpression('/^auth-modals-[a-z0-9]{8}\.webp$/', $path);
        $this->assertFileExists($this->tmpDir().'/public/assets/'.$path);
        $this->assertSame($path, $this->forum()['authModalsImage']);
    }

    public function test_membro_nao_envia_imagem(): void
    {
        $response = $this->upload(2, $this->png(), 'fundo.png', 'image/png');

        $this->assertEquals(403, $response->getStatusCode());
    }

    public function test_arquivo_que_nao_e_imagem_e_recusado(): void
    {
        $path = (string) tempnam(sys_get_temp_dir(), 'am');
        file_put_contents($path, '%PDF-1.4 não é imagem');

        $response = $this->upload(1, $path, 'documento.pdf', 'application/pdf');

        $this->assertEquals(422, $response->getStatusCode(), (string) $response->getBody());
    }

    public function test_imagem_com_dimensoes_enormes_e_recusada_antes_de_decodificar(): void
    {
        // Cabeçalho PNG declarando 20000×20000 px em poucos bytes.
        $ihdr = 'IHDR'.pack('NNCCCCC', 20000, 20000, 8, 2, 0, 0, 0);
        $png = "\x89PNG\r\n\x1a\n".pack('N', 13).$ihdr.pack('N', crc32($ihdr));
        $path = (string) tempnam(sys_get_temp_dir(), 'am').'.png';
        file_put_contents($path, $png);

        $response = $this->upload(1, $path, 'bomba.png', 'image/png');

        $this->assertEquals(422, $response->getStatusCode(), (string) $response->getBody());
    }

    public function test_admin_remove_a_imagem(): void
    {
        $this->upload(1, $this->png(), 'fundo.png', 'image/png');
        $settings = $this->app()->getContainer()->make(SettingsRepositoryInterface::class);
        $path = $settings->get('auth-modals.image');

        $response = $this->send($this->request('DELETE', '/api/auth-modals/image', ['authenticatedAs' => 1]));

        $this->assertEquals(204, $response->getStatusCode(), (string) $response->getBody());
        $this->assertNull($this->database()->table('settings')->where('key', 'auth-modals.image')->value('value'));
        $this->assertFileDoesNotExist($this->tmpDir().'/public/assets/'.$path);
    }

    public function test_membro_nao_remove_a_imagem(): void
    {
        $response = $this->send($this->request('DELETE', '/api/auth-modals/image', ['authenticatedAs' => 2]));

        $this->assertEquals(403, $response->getStatusCode());
    }

    public function test_botoes_do_header_desligados_por_padrao(): void
    {
        $this->assertFalse($this->forum()['authModalsShowHeaderButtons']);
    }

    public function test_botoes_do_header_ligados(): void
    {
        $this->setting('auth-modals.show_header_buttons', '1');

        $this->assertTrue($this->forum()['authModalsShowHeaderButtons']);
    }
}
