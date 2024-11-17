<?php

namespace App\Http\Controllers\USER;

use Inertia\Inertia;
use App\Models\Banner;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        // bestSeller
        $bestSeller =
            Product::leftJoin('order_items', 'products.id', '=', 'order_items.product_id')
            ->with(['subCategory.category', 'productImage'])
            ->select('products.*', DB::raw('COALESCE(SUM(order_items.quantity), 0) as total_ordered'))
            ->groupBy('products.id')
            ->orderByDesc('total_ordered')
            ->take(8)
            ->get();
        return Inertia::render('User/home/Welcome', [
            'banners' => $banners,
            'newProduct' => $newProduct,
            'bestSeller' => $bestSeller
        ]);
    }
}
