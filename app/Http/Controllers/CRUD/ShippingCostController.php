<?php

namespace App\Http\Controllers\CRUD;

use App\Models\ShippingCost;
use Illuminate\Http\Request;
use App\Http\Resources\CrudResource;
use Illuminate\Support\Facades\Validator;

class ShippingCostController
{
    protected function spartaValidation($request, $id = "")
    {
        $required = "";
        if ($id == "") {
            $required = "required";
        }
        $rules = [
            'village_id' => 'required|unique:categories,village_id,' . $id,
            'shipping_cost' => 'required',
        ];

        $messages = [
            'village_id.required' => 'Nama Kelurahan harus diisi.',
            'village_id.unique' => 'Kelurahan sudah ada.',
            'shipping_cost.required' => 'Harga harus diisi.',
        ];
        $validator = Validator::make($request, $rules, $messages);

        if ($validator->fails()) {
            $message = [
                'judul' => 'Gagal',
                'type' => 'error',
                'message' => $validator->errors()->first(),
            ];
            return response()->json($message, 400);
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sortby = $request->sortby;
        $order = $request->order;

        $data = ShippingCost::with('village.subDistrict')
            ->when($sortby, function ($query) use ($sortby, $order) {
                $query->orderBy($sortby, $order ?? 'asc');
            })
            ->get();
        return new CrudResource('success', 'Data ShippingCost', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data_req = $request->all();
        // return $data_req;
        $validate = $this->spartaValidation($data_req);
        if ($validate) {
            return $validate;
        }
        ShippingCost::create($data_req);

        $data = ShippingCost::with('village.subDistrict')->latest()->first();

        return new CrudResource('success', 'Data Berhasil Disimpan', $data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data_req = $request->all();
        // return $data_req;
        $validate = $this->spartaValidation($data_req, $id);
        if ($validate) {
            return $validate;
        }

        ShippingCost::find($id)->update($data_req);

        $data = ShippingCost::with('village.subDistrict')->find($id);

        return new CrudResource('success', 'Data Berhasil Diubah', $data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = ShippingCost::findOrFail($id);
        // delete data
        $data->delete();

        return new CrudResource('success', 'Data Berhasil Dihapus', $data);
    }
}
