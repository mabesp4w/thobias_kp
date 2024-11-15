<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'categories'], function () {
    Route::get('/', [App\Http\Controllers\API\CategoryAPI::class, 'index'])->name('categories');
    Route::get('all', [App\Http\Controllers\API\CategoryAPI::class, 'all'])->name('categories.all');
});
// products
Route::group(['prefix' => 'products'], function () {
    Route::get('getProductIds', [App\Http\Controllers\API\ProdukAPI::class, 'getProductIds'])->name('products.getProductIds');
});
// villages
Route::group(['prefix' => 'villages'], function () {
    Route::get('/', [App\Http\Controllers\API\VillageController::class, 'index'])->name('villages');
});
