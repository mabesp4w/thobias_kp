<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\USER\HomeController::class, 'index'])->name('user.home');
Route::get('/products/{category_slug}/{sub_category_id}', [App\Http\Controllers\USER\ProductUserController::class, 'subCategory'])->name('user.product.subCategory');
