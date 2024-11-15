<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Admin/dashboard/Index');
});

Route::get('banners', function () {
    return Inertia::render('Admin/banners/Index');
})->name('admin.banners');

// locations
Route::group(['prefix' => 'locations'], function () {
    Route::get('subDistricts', function () {
        return Inertia::render('Admin/locations/subDistricts/Index');
    })->name('admin.locations.subDistricts');
    Route::get('villages', function () {
        return Inertia::render('Admin/locations/villages/Index');
    })->name('admin.locations.villages');
    Route::get('shippingCosts', function () {
        return Inertia::render('Admin/locations/shippingCosts/Index');
    })->name('admin.locations.shippingCosts');
});

// categories
Route::group(['prefix' => 'categories'], function () {
    Route::get('lists', function () {
        return Inertia::render('Admin/categories/lists/Index');
    })->name('admin.categories.lists');
    Route::get('subCategories', function () {
        return Inertia::render('Admin/categories/subCategories/Index');
    })->name('admin.categories.subCategories');
});

// products
Route::group(['prefix' => 'products'], function () {
    Route::get('lists', function () {
        return Inertia::render('Admin/products/lists/Index');
    })->name('admin.products.lists');
    Route::get('images/{product_id}', function ($product_id) {
        return Inertia::render('Admin/products/images/Index', [
            'product_id' => $product_id
        ]);
    })->name('admin.products.images');
});
