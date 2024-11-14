<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', [App\Http\Controllers\USER\HomeController::class, 'index'])->name('user.home');
Route::group(['prefix' => 'products'], function () {
    Route::get('detail/{id}', [App\Http\Controllers\USER\ProductUserController::class, 'detail'])->name('user.product.detail');
    Route::get('{category_slug}/{sub_category_id}', [App\Http\Controllers\USER\ProductUserController::class, 'subCategory'])->name('user.product.subCategory');
});

// cart
Route::group(['prefix' => 'carts'], function () {
    Route::get('getCartData', [App\Http\Controllers\API\CartAPI::class, 'getCartData']);
    Route::post('addToCartSession', [App\Http\Controllers\API\CartAPI::class, 'addToCartSession']);
    Route::post('removeFromCartSession', [App\Http\Controllers\API\CartAPI::class, 'removeFromCartSession']);
    Route::post('addToCartDatabase', [App\Http\Controllers\API\CartAPI::class, 'addToCartDatabase']);
    Route::post('removeFromCartDatabase', [App\Http\Controllers\API\CartAPI::class, 'removeFromCartDatabase']);
    Route::get('copySessionCartToDatabase', [App\Http\Controllers\API\CartAPI::class, 'copySessionCartToDatabase']);
});
