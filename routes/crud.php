<?php

use Illuminate\Support\Facades\Route;

Route::resources([
    'banners' => \App\Http\Controllers\CRUD\BannerController::class,
    // 'categories' => \App\Http\Controllers\CRUD\CategoryController::class,
    // 'products' => \App\Http\Controllers\CRUD\ProductController::class,
]);
