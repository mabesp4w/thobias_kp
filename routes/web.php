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
