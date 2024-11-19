<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        then: function ($router) {
            Route::prefix('admin')
                ->middleware(['web', 'auth'])
                ->name('admin')
                ->group(base_path('routes/admin.php'));
            Route::prefix('auth')
                ->middleware('api')
                ->name('auth')
                ->group(base_path('routes/auth.php'));
            Route::prefix('crud')
                ->middleware('api')
                ->name('crud')
                ->group(base_path('routes/crud.php'));
            Route::prefix('api')
                ->middleware('api')
                ->name('api')
                ->group(base_path('routes/api.php'));
        }
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
