<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model
{
    use HasFactory, HasUuids;

    // belongsTo product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // belongsTo user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
