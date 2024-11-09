<?php

use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\USER\HomeController::class, 'index'])->name('user.home');
