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

// shippingCosts
Route::group(['prefix' => 'shippingCosts'], function () {
    Route::get('/', [App\Http\Controllers\API\ShippingCostAPI::class, 'index'])->name('shippingCosts');
    Route::get('{id}', [App\Http\Controllers\API\ShippingCostAPI::class, 'show'])->name('shippingCosts.show');
});

// orders
Route::group(['prefix' => 'orders'], function () {
    Route::get('/', [App\Http\Controllers\API\OrderAPI::class, 'index'])->name('orders');
    Route::get('all', [App\Http\Controllers\API\OrderAPI::class, 'all'])->name('orders.all');
    Route::get('{id}', [App\Http\Controllers\API\OrderAPI::class, 'show'])->name('orders.show');
});

// payments
Route::group(['prefix' => 'payment'], function () {
    Route::post('/callback', [App\Http\Controllers\USER\PaymentController::class, 'paymentCallback'])->name('payment.callback');
});
