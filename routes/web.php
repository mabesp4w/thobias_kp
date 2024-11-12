<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\USER\HomeController::class, 'index'])->name('user.home');
Route::group(['prefix' => 'products'], function () {
    Route::get('detail/{id}', [App\Http\Controllers\USER\ProductUserController::class, 'detail'])->name('user.product.detail');
    Route::get('{category_slug}/{sub_category_id}', [App\Http\Controllers\USER\ProductUserController::class, 'subCategory'])->name('user.product.subCategory');
});
