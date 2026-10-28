<?php

declare(strict_types=1);

namespace Ramon\AuthModals\Controller;

use Flarum\Api\Controller\UploadImageController;
use Intervention\Image\Interfaces\EncodedImageInterface;
use Psr\Http\Message\UploadedFileInterface;

class UploadAuthImageController extends UploadImageController
{
    protected string $filePathSettingKey = 'auth-modals.image';
    protected string $filenamePrefix = 'auth-modals';
    protected string $fileExtension = 'webp';

    #[\Override]
    protected function makeImage(UploadedFileInterface $file): EncodedImageInterface
    {
        return $this->imageManager->read($file->getStream()->getMetadata('uri'))
            ->scaleDown(width: 900)
            ->toWebp(quality: 80);
    }
}
