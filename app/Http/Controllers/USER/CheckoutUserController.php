<?php

namespace App\Http\Controllers\USER;

use App\Models\Cart;
use Midtrans\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutUserController
{
    public function index()
    {
        $carts = Cart::with(['product.productImage'])
            ->where('user_id', Auth::id())->get();
        $MIDTRANS_CLIENT_KEY = Config::$serverKey = config('services.midtrans.client_key');
        // inertia
        return inertia('User/checkout/Index', [
            'carts' => $carts,
            'MIDTRANS_CLIENT_KEY' => $MIDTRANS_CLIENT_KEY
        ]);
    }
}
