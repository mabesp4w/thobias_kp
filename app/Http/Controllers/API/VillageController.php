<?php

namespace App\Http\Controllers\API;

use App\Models\Village;
use Illuminate\Http\Request;
use App\Http\Resources\CrudResource;

class VillageController
{
    public function index()
    {
        $data = Village::with('subDistrict')->get();
        return new CrudResource('success', 'Data Village', $data);
    }
}
