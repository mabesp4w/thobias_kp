<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Admin/dashboard/Index');
});

Route::get('banners', function () {
    return Inertia::render('Admin/banners/Index');
});
