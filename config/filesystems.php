<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */

    'default' => isset($_ENV["FILESYSTEM_DRIVER"]) ? $_ENV["FILESYSTEM_DRIVER"] : "local",

    /*
    |--------------------------------------------------------------------------
    | Default Cloud Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Many applications store files both locally and in the cloud. For this
    | reason, you may specify a default "cloud" driver here. This driver
    | will be bound as the Cloud disk implementation in the container.
    |
    */

    'cloud' => isset($_ENV["FILESYSTEM_CLOUD"]) ? $_ENV["FILESYSTEM_CLOUD"] : "s3",

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you may configure as many filesystem "disks" as you wish, and you
    | may even configure multiple disks of the same driver. Defaults have
    | been setup for each driver as an example of the required options.
    |
    | Supported Drivers: "local", "ftp", "s3", "rackspace"
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => (isset($_ENV["APP_URL"]) ? $_ENV["APP_URL"] : "").'/storage',
            'visibility' => 'public',
        ],

        's3' => [
            'driver' => 's3',
            'key' => isset($_ENV["AWS_KEY"]) ? $_ENV["AWS_KEY"] : "",
            'secret' => isset($_ENV["AWS_SECRET"]) ? $_ENV["AWS_SECRET"] : "",
            'region' => isset($_ENV["AWS_SECRET"]) ? $_ENV["AWS_SECRET"] : "",
            'bucket' => isset($_ENV["AWS_BUCKET"]) ? $_ENV["AWS_BUCKET"] : "",
        ],

    ],

];