<?php

namespace App\Http\Controllers\API;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\CrudResource;

class CategoryAPI
{
    public function index(Request $request)
    {
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;
        $limit = $request->limit;

        $data = Category::with('subCategory')->where(function ($query) use ($search) {
            $query->where('category_nm', 'like', "%$search%");
        })
            ->when($sortby, function ($query) use ($sortby, $order) {
                $query->orderBy($sortby, $order ?? 'asc');
            })
            ->paginate($limit);
        return new CrudResource('success', 'Data Category', $data);
    }

    // all category
    public function all()
    {
        $data = Category::with('subCategory')->get();
        return new CrudResource('success', 'Data Category', $data);
    }
}
