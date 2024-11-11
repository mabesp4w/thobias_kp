<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'categories'], function () {
    Route::get('/', [App\Http\Controllers\API\CategoryAPI::class, 'index']);
    Route::get('all', [App\Http\Controllers\API\CategoryAPI::class, 'all']);
});
