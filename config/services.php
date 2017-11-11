<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain' => isset($_ENV["MAILGUN_DOMAIN"]) ? $_ENV["MAILGUN_DOMAIN"] : "",
        'secret' => isset($_ENV["MAILGUN_SECRET"]) ? $_ENV["MAILGUN_SECRET"] : "",
    ],

    'ses' => [
        'key' => isset($_ENV["SES_KEY"]) ? $_ENV["SES_KEY"] : "",
        'secret' => isset($_ENV["SES_SECRET"]) ? $_ENV["SES_SECRET"] : "",
        'region' => 'us-east-1',
    ],

    'sparkpost' => [
        'secret' => isset($_ENV["SPARKPOST_SECRET"]) ? $_ENV["SPARKPOST_SECRET"] : "",
    ],

    'stripe' => [
        'model' => App\User::class,
        'key' => isset($_ENV["STRIPE_KEY"]) ? $_ENV["STRIPE_KEY"] : "",
        'secret' => isset($_ENV["STRIPE_SECRET"]) ? $_ENV["STRIPE_SECRET"] : "",
    ],

];