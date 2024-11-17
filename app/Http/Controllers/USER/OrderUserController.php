<?php

namespace App\Http\Controllers\USER;

use Midtrans\Config;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderUserController
{
    public function history()
    {
        $orders = Order::with('orderItems.product.productImage')
            ->where('user_id', Auth::id())->get();
        // return inertia
        return inertia('User/orders/Histories', [
            'orders' => $orders
        ]);
    }
    // active
    public function index()
    {
        $order = Order::with(['orderItems.product.productImage', 'user'])
            ->whereNotIn('status', ['completed', 'delivery']) // Menambahkan 'delivery' ke dalam kondisi
            ->first();
        // return inertia
        return inertia('User/orders/Orders', [
            'order' => $order,
        ]);
    }
}
