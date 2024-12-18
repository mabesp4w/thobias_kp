<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Village extends Model
{
    use HasFactory, HasUuids;

    // Belongs to subDistrict
    public function subDistrict()
    {
        return $this->belongsTo(SubDistrict::class);
    }
}
