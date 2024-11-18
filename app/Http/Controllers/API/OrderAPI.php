<?php

namespace App\Http\Controllers\API;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Resources\CrudResource;

class OrderAPI
{
    public function index(Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;
        $limit = $request->limit;

        $data = Order::with('orderItems')
            ->when($sortby, function ($query) use ($sortby, $order) {
                $query->orderBy($sortby, $order ?? 'asc');
            })
            ->paginate($limit);
        return new CrudResource('success', 'Data Order', $data);
    }

    // all order
    public function all(Request $request)
    {
        $status = $request->status;
        $user_id = $request->user_id;
        $data = Order::with(['orderItems.product.productImage', 'shippingCost'])
            ->where('status', $status)
            ->where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->get();
        return new CrudResource('success', 'Data Order', $data);
    }

    // show
    public function show($id)
    {
        $data = Order::with('orderItems')->find($id);
        return new CrudResource('success', 'Data Order', $data);
    }
}
