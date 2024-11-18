<?php

namespace App\Http\Controllers\USER;

use Midtrans\Snap;
use Midtrans\Config;
use App\Models\Order;
use Midtrans\Transaction;
use Midtrans\Notification;
use Illuminate\Http\Request;
use App\Models\ShippingStatus;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class PaymentController
{
    public function __construct()
    {
        // Konfigurasi Midtrans
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');
        Config::$isSanitized = config('services.midtrans.sanitized');
        Config::$is3ds = config('services.midtrans.3ds');
    }

    public function submitPayment(Request $request)
    {
        $order = Order::with(['orderItems.product.productImage', 'user.userInfo'])
            ->find($request->order_id); // Dapatkan order berdasarkan ID
        $item_details = [];
        foreach ($order->orderItems as $item) {
            $item_details[] = [
                'id' => $item['product_id'],
                'price' => $item['product']['price'],
                'quantity' => $item['quantity'],
                'name' => $item['product']['product_nm']
            ];
        }

        $params = [
            'transaction_details' => [
                'order_id' => $order->id,
                'gross_amount' => $order->total_payment,
            ],
            'customer_details' => [
                'first_name' => $order->user->name,
                'email' => $order->user->email,
                'phone' => $order->user->userInfo[0]->phone_number,
            ],
            'item_details' => $item_details,
            'expiry' => [
                'start_time' => date("Y-m-d H:i:s T"), // Waktu mulai transaksi
                'unit' => 'minute', // Unit waktu kedaluwarsa (minute, hour, day)
                'duration' => 120 // Durasi kedaluwarsa, contoh 120 menit
            ],
        ];

        $snapToken = Snap::getSnapToken($params);
        $order->update(['snap_token' => $snapToken]);
        return response()->json($snapToken);
    }

    public function getTransactionStatus($orderId)
    {
        try {
            $status = Transaction::status($orderId);
            return response()->json($status);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function paymentCallback()
    {
        // Inisialisasi notifikasi
        $notification = new Notification();

        $transaction = $notification->transaction_status;
        $type = $notification->payment_type;
        $orderId = $notification->order_id;
        $fraud = $notification->fraud_status;

        // Log data for debugging
        Log::info('Payment Notification:', (array) $notification);


        try {
            // Proses notifikasi berdasarkan status
            if ($transaction == 'capture') {
                if ($type == 'credit_card') {
                    if ($fraud == 'challenge') {
                        // Transaksi perlu verifikasi manual
                        Order::where('id', $orderId)->update(['status' => 'tunggu']);
                    } else {
                        // Transaksi berhasil
                        Order::where('id', $orderId)->update(['status' => 'dibayar']);
                        // add shipping status
                        ShippingStatus::create([
                            'order_id' => $orderId,
                            'user_id' => Auth::id(),
                            'status' => 'dikemas'
                        ]);
                    }
                }
            } elseif ($transaction == 'settlement') {
                // Transaksi selesai
                Order::where('id', $orderId)->update(['status' => 'dibayar']);
                ShippingStatus::create([
                    'order_id' => $orderId,
                    'user_id' => Auth::id(),
                    'status' => 'dikemas'
                ]);
            } elseif ($transaction == 'pending') {
                // Transaksi menunggu pembayaran
                Order::where('id', $orderId)->update(['status' => 'tunggu']);
            } elseif ($transaction == 'deny') {
                // Transaksi ditolak
                Order::where('id', $orderId)->update(['status' => 'batal']);
            } elseif ($transaction == 'expire') {
                // Transaksi kadaluarsa
                Order::where('id', $orderId)->update(['status' => 'batal']);
            } elseif ($transaction == 'cancel') {
                // Transaksi dibatalkan
                Order::where('id', $orderId)->update(['status' => 'batal']);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error processing notification',
                'error' => $th
            ], 500);
        }

        return response()->json(['message' => 'Notification processed successfully']);
    }
}
