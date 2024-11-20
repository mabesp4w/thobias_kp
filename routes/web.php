<?php

use App\Http\Controllers\USER\UserInfoController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;


Route::get('/', [App\Http\Controllers\USER\HomeController::class, 'index'])->name('user.home');
Route::group(['prefix' => 'products'], function () {
    Route::get('/', [App\Http\Controllers\USER\ProductUserController::class, 'index'])->name('user.product.index');
    Route::get('detail/{id}', [App\Http\Controllers\USER\ProductUserController::class, 'detail'])->name('user.product.detail');
    Route::get('{category_slug}/{sub_category_id}', [App\Http\Controllers\USER\ProductUserController::class, 'subCategory'])->name('user.product.subCategory');
});

// cart
Route::group(['prefix' => 'carts'], function () {
    Route::get('getCartData', [App\Http\Controllers\API\CartAPI::class, 'getCartData']);
    Route::post('addToCartSession', [App\Http\Controllers\API\CartAPI::class, 'addToCartSession']);
    Route::post('removeFromCartSession', [App\Http\Controllers\API\CartAPI::class, 'removeFromCartSession']);
    Route::post('addToCartDatabase', [App\Http\Controllers\API\CartAPI::class, 'addToCartDatabase']);
    Route::post('setCartQuantity', [App\Http\Controllers\API\CartAPI::class, 'setCartQuantity']);
    Route::post('removeFromCartDatabase', [App\Http\Controllers\API\CartAPI::class, 'removeFromCartDatabase']);
    Route::get('copySessionCartToDatabase', [App\Http\Controllers\API\CartAPI::class, 'copySessionCartToDatabase']);
});

Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        // redirect ke halaman login inertia route name
        return Inertia::location(route('user.home'));
    })->name('login');
    Route::post('/login', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
    // register
    Route::post('/register', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'register']);
});

Route::middleware('auth')->group(function () {
    Route::get('/status', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'status'])->name('status');
    Route::post('/logout', [App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'destroy'])->name('logout');
    // checkout
    Route::group(['prefix' => 'checkout'], function () {
        Route::get('/', [App\Http\Controllers\USER\CheckoutUserController::class, 'index'])->name('user.checkout.index');
    });

    Route::group(['prefix' => '/orders'], function () {
        Route::get('/', [App\Http\Controllers\USER\OrderUserController::class, 'index'])->name('user.orders.index');
    });

    Route::group(['prefix' => 'payment'], function () {
        Route::post('/', [App\Http\Controllers\USER\PaymentController::class, 'submitPayment'])->name('payment.submit');
        Route::get('/status/{orderId}', [App\Http\Controllers\USER\PaymentController::class, 'getTransactionStatus'])->name('payment.status');
    });
});
