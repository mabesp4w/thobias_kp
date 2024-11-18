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
        $order = Order::with(['orderItems.product.productImage', 'user', 'shippingCost'])
            ->where('status', 'tunggu')
            ->where('user_id', Auth::id())
            ->first();
        $MIDTRANS_CLIENT_KEY = Config::$serverKey = config('services.midtrans.client_key');
        // return inertia
        return inertia('User/orders/Orders', [
            'order' => $order,
            'MIDTRANS_CLIENT_KEY' => $MIDTRANS_CLIENT_KEY,
            'user' => Auth::user()
        ]);
    }
}
