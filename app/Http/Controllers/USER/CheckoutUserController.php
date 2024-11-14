<?php

namespace App\Http\Controllers\USER;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutUserController
{
    public function index()
    {
        $carts = Cart::where('user_id', Auth::id())->get();

        // inertia
        return inertia('User/checkout/Index', [
            'carts' => $carts
        ]);
    }
}
