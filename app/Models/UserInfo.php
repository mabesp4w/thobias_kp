<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserInfo extends Model
{
    use HasFactory, HasUuids;

    // belongsTo village
    public function village()
    {
        return $this->belongsTo(Village::class);
    }
}
