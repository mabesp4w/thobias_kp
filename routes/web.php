<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\USER\HomeController::class, 'index'])->name('user.home');
Route::get('products', function () {
    return Inertia::render('User/products/Index');
});
Route::get('/refresh/{url}', function ($url) {
    return Inertia::render('User/fresh/RefreshHandler', [
        'url' => $url
    ]);
});
