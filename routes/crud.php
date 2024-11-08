<?php

use Illuminate\Support\Facades\Route;

Route::resources([
    'banners' => \App\Http\Controllers\CRUD\BannerController::class,
    'subDistricts' => \App\Http\Controllers\CRUD\SubDistrictController::class,
    'villages' => \App\Http\Controllers\CRUD\VillageController::class,
    'categories' => \App\Http\Controllers\CRUD\CategoryController::class,
    // 'products' => \App\Http\Controllers\CRUD\ProductController::class,
]);
