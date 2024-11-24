<?php

namespace App\Http\Controllers\API;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\CrudResource;

class ProdukAPI
{
    public function getProductIds(Request $request)
    {
        $Ids = $request->input('ids', []);
        $productIds = array_column($Ids, 'product_id');

        $products = Product::whereIn('id', $productIds)
            ->with(['subCategory.category', 'productImage'])
            ->get();

        return new CrudResource('success', 'Data Product', $products);
    }
}
