<?php

/*
 * This file is part of ramon/auth-modals.
 *
 * Copyright (c) 2026 Ramon Guilherme.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Ramon\AuthModals\Api\Controller;

use Flarum\Api\Controller\UploadImageController;
use Intervention\Image\Interfaces\EncodedImageInterface;
use Psr\Http\Message\UploadedFileInterface;
use Ramon\AuthModals\AuthImageValidator;

class UploadAuthImageController extends UploadImageController
{
    protected string $filePathSettingKey = 'auth-modals.image';
    protected string $filenamePrefix = 'auth-modals';
    protected string $fileExtension = 'webp';
    protected ?string $validator = AuthImageValidator::class;

    protected function makeImage(UploadedFileInterface $file): EncodedImageInterface
    {
        // O painel tem no máximo 380px de largura; 900px cobre telas 2x.
        return $this->imageManager->read($file->getStream()->getMetadata('uri'))
            ->scaleDown(width: 900)
            ->toWebp(quality: 80);
    }
}
