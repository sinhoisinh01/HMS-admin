<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */

    'default' => isset($_ENV["DB_CONNECTION"]) ? $_ENV["DB_CONNECTION"] : "mysql",

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by Laravel is shown below to make development simple.
    |
    |
    | All database work in Laravel is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */

    'connections' => [

        'sqlite' => [
            'driver' => 'sqlite',
            'database' => isset($_ENV["DB_DATABASE"]) ? $_ENV["DB_DATABASE"] : database_path("database.sqlite"),
            'prefix' => '',
        ],

        'mysql' => [
            'driver' => 'mysql',
            'host' => isset($_ENV["DB_HOST"]) ? $_ENV["DB_HOST"] : "127.0.0.1",
            'port' => isset($_ENV["DB_PORT"]) ? $_ENV["DB_PORT"] : "3306",
            'database' => isset($_ENV["DB_DATABASE"]) ? $_ENV["DB_DATABASE"] : "forge",
            'username' => isset($_ENV["DB_USERNAME"]) ? $_ENV["DB_USERNAME"] : "forge",
            'password' => isset($_ENV["DB_PASSWORD"]) ? $_ENV["DB_PASSWORD"] : "",
            'unix_socket' => isset($_ENV["DB_SOCKET"]) ? $_ENV["DB_SOCKET"] : "",
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ],

        'pgsql' => [
            'driver' => 'pgsql',
            'host' => isset($_ENV["DB_HOST"]) ? $_ENV["DB_HOST"] : "127.0.0.1",
            'port' => isset($_ENV["DB_PORT"]) ? $_ENV["DB_PORT"] : "5432",
            'database' => isset($_ENV["DB_DATABASE"]) ? $_ENV["DB_DATABASE"] : "forge",
            'username' => isset($_ENV["DB_USERNAME"]) ? $_ENV["DB_USERNAME"] : "forge",
            'password' => isset($_ENV["DB_PASSWORD"]) ? $_ENV["DB_PASSWORD"] : "",
            'charset' => 'utf8',
            'prefix' => '',
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],

        'sqlsrv' => [
            'driver' => 'sqlsrv',
            'host' => isset($_ENV["DB_HOST"]) ? $_ENV["DB_HOST"] : "localhost",
            'port' => isset($_ENV["DB_PORT"]) ? $_ENV["DB_PORT"] : "1433",
            'database' => isset($_ENV["DB_DATABASE"]) ? $_ENV["DB_DATABASE"] : "forge",
            'username' => isset($_ENV["DB_USERNAME"]) ? $_ENV["DB_USERNAME"] : "forge",
            'password' => isset($_ENV["DB_PASSWORD"]) ? $_ENV["DB_PASSWORD"] : "",
            'charset' => 'utf8',
            'prefix' => '',
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Migration Repository Table
    |--------------------------------------------------------------------------
    |
    | This table keeps track of all the migrations that have already run for
    | your application. Using this information, we can determine which of
    | the migrations on disk haven't actually been run in the database.
    |
    */

    'migrations' => 'migrations',

    /*
    |--------------------------------------------------------------------------
    | Redis Databases
    |--------------------------------------------------------------------------
    |
    | Redis is an open source, fast, and advanced key-value store that also
    | provides a richer set of commands than a typical key-value systems
    | such as APC or Memcached. Laravel makes it easy to dig right in.
    |
    */

    'redis' => [

        'client' => 'predis',

        'default' => [
            'host' => isset($_ENV["REDIS_HOST"]) ? $_ENV["REDIS_HOST"] : "127.0.0.1",
            'password' => isset($_ENV["REDIS_PASSWORD"]) ? $_ENV["REDIS_PASSWORD"] : null,
            'port' => isset($_ENV["REDIS_PORT"]) ? $_ENV["REDIS_PORT"] : 6379,
            'database' => 0,
        ],

    ],

];