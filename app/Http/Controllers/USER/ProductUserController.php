<?php

namespace App\Http\Controllers\USER;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\SubCategory;
use Illuminate\Http\Request;

class ProductUserController
{
    public function subCategory($category_slug, $sub_category_id, Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;

        $products = Product::where('sub_category_id', $sub_category_id)
            ->with(['subCategory.category', 'productImage', 'review.user'])
            ->orderBy($sortby ?? 'created_at', $order ?? 'desc')
            ->where('product_nm', 'like', "%$search%")
            ->paginate(12);
        $subCategory = SubCategory::where('id', $sub_category_id)
            ->with(['category'])
            ->first();

        return Inertia::render('User/products/Index', [
            'products' => $products,
            'subCategory' => $subCategory
        ]);
    }

    function detail($id)
    {
        $product = Product::with(['subCategory.category', 'productImage', 'review.user', 'orderItem.order'])->find($id);
        return Inertia::render('User/products/Detail', [
            'product' => $product
        ]);
    }
}
