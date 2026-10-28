<?php

/*
 * This file is part of ramon/auth-modals.
 *
 * Copyright (c) 2026 Ramon Guilherme.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

declare(strict_types=1);

namespace Ramon\AuthModals\Tests\unit;

use Flarum\Foundation\AbstractImageValidator;
use PHPUnit\Framework\TestCase;
use Ramon\AuthModals\AuthImageValidator;

final class AuthImageValidatorTest extends TestCase
{
    public function test_usa_as_checagens_de_imagem_do_core(): void
    {
        self::assertTrue(is_subclass_of(AuthImageValidator::class, AbstractImageValidator::class));
    }

    public function test_aceita_fotos_de_ate_8_mb(): void
    {
        $validator = (new \ReflectionClass(AuthImageValidator::class))->newInstanceWithoutConstructor();

        self::assertSame(8192, $validator->getMaxSize());
        self::assertSame(24_000_000, $validator->getMaxResolution());
    }
}
