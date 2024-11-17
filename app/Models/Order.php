<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory, HasUuids;

    // has many order items
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    // belongs to user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
