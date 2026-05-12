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

use Flarum\Extend;
use Ramon\AuthModals\Controller\DeleteAuthImageController;
use Ramon\AuthModals\Controller\UploadAuthImageController;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Routes('api'))
        ->post('/auth-modals/image', 'auth-modals.image.upload', UploadAuthImageController::class)
        ->delete('/auth-modals/image', 'auth-modals.image.delete', DeleteAuthImageController::class),

    (new Extend\Settings())
        ->serializeToForum('authModalsImage', 'auth-modals.image')
        ->serializeToForum('authModalsShowHeaderButtons', 'auth-modals.show_header_buttons', 'boolval')
        ->default('auth-modals.show_header_buttons', false),
];
