<?php

return [

    'paths' => ['api/*', 'login', 'register', '*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'https://auth-app-nine-kohl.vercel.app',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,

];