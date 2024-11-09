<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Admin/dashboard/Index');
});

Route::get('banners', function () {
    return Inertia::render('Admin/banners/Index');
});

// locations
Route::group(['prefix' => 'locations'], function () {
    Route::get('subDistricts', function () {
        return Inertia::render('Admin/locations/subDistricts/Index');
    });
    Route::get('villages', function () {
        return Inertia::render('Admin/locations/villages/Index');
    });
    Route::get('shippingCosts', function () {
        return Inertia::render('Admin/locations/shippingCosts/Index');
    });
});

// categories
Route::group(['prefix' => 'categories'], function () {
    Route::get('lists', function () {
        return Inertia::render('Admin/categories/lists/Index');
    });
});
