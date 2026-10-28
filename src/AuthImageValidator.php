<?php

/*
 * This file is part of ramon/auth-modals.
 *
 * Copyright (c) 2026 Ramon Guilherme.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Ramon\AuthModals;

use Flarum\Foundation\AbstractImageValidator;

/**
 * As mesmas checagens do logo do core: tipo, tamanho e dimensões, antes de
 * decodificar a imagem.
 */
class AuthImageValidator extends AbstractImageValidator
{
    /**
     * Fotos de fundo costumam passar dos 2 MB do logo. A imagem salva é
     * reduzida para 900px de largura, então isso só limita o envio.
     */
    public function getMaxSize(): int
    {
        return 8192;
    }
}
