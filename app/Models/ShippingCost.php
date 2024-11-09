<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ShippingCost extends Model
{
    use HasFactory, HasUuids;

    // belongs to village
    public function village()
    {
        return $this->belongsTo(Village::class);
    }
}
