<?php

namespace App\Http\Controllers\USER;

use Inertia\Inertia;
use App\Models\Banner;
use App\Models\Product;
use Illuminate\Http\Request;

class HomeController
{
    public function index()
    {
        $banners = Banner::orderBy('position', 'asc')->get();
        // new product
        $newProduct = Product::with(['subCategory.category', 'productImage'])
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get();
        return Inertia::render('User/home/Welcome', [
            'banners' => $banners,
            'newProduct' => $newProduct
        ]);
    }
}
