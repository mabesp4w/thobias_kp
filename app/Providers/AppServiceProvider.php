<?php

namespace App\Providers;

use App\Http\Controllers\API\CartAPI;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Event;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Model::unguard();

        Event::listen(Login::class, function () {
            app()->call([CartAPI::class, 'copySessionCartToDatabase']);
        });
    }
}
