<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, HasUuids;

    // slug
    public static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            $product->slug = Str::slug($product->product_nm);
        });
    }

    // belongsTo subCategory
    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class);
    }

    // hasMany productImage
    public function productImage()
    {
        return $this->hasMany(ProductImage::class);
    }
}
