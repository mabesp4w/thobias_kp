<?php

namespace App\Http\Controllers\USER;

use App\Models\Banner;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController
{
    public function index()
    {
        $banners = Banner::orderBy('position', 'asc')->get();
        return Inertia::render('User/home/Welcome', [
            'banners' => $banners
        ]);
    }
}
