<?php

use Illuminate\Support\Facades\Route;

Route::resources([
    'banners' => \App\Http\Controllers\CRUD\BannerController::class,
    'subDistricts' => \App\Http\Controllers\CRUD\SubDistrictController::class,
    'villages' => \App\Http\Controllers\CRUD\VillageController::class,
    'shippingCosts' => \App\Http\Controllers\CRUD\ShippingCostController::class,
    'categories' => \App\Http\Controllers\CRUD\CategoryController::class,
    'subCategories' => \App\Http\Controllers\CRUD\SubCategoryController::class,
    'products' => \App\Http\Controllers\CRUD\ProductController::class,
    'productImages' => \App\Http\Controllers\CRUD\ProductImageController::class,
    'userInfos' => \App\Http\Controllers\CRUD\UserInfoController::class,
    'orders' => \App\Http\Controllers\CRUD\OrderController::class,
    'reviews' => \App\Http\Controllers\CRUD\ReviewController::class
]);
