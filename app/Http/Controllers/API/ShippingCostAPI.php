<?php

namespace App\Http\Controllers\API;

use App\Models\ShippingCost;
use Illuminate\Http\Request;
use App\Http\Resources\CrudResource;

class ShippingCostAPI
{
    public function index()
    {
        $data = ShippingCost::with('village')->get();
        return new CrudResource('success', 'Data Shipping', $data);
    }

    // show
    public function show(string $id)
    {
        $data = ShippingCost::with('village')->where('village_id', $id)->first();
        return new CrudResource('success', 'Data Shipping', $data);
    }
}
