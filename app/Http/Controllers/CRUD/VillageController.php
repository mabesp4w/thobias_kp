<?php

namespace App\Http\Controllers\CRUD;

use Inertia\Inertia;
use App\Models\Village;
use Illuminate\Http\Request;
use App\Http\Resources\CrudResource;
use Illuminate\Support\Facades\Validator;

class VillageController
{
    protected function spartaValidation($request, $id = "")
    {
        $required = "";
        if ($id == "") {
            $required = "required";
        }
        $rules = [
            'village_nm' => 'required|unique:categories,village_nm,' . $id,
            'sub_district_id' => 'required',
        ];

        $messages = [
            'village_nm.required' => 'Nama Kelurahan harus diisi.',
            'village_nm.unique' => 'Kelurahan sudah ada.',
            'sub_district_id.required' => 'SubDistrict harus diisi.',
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
        $search = $request->search;
        $sortby = $request->sortby;
        $order = $request->order;

        $data = Village::with('subDistrict')->where(function ($query) use ($search) {
            $query->where('village_nm', 'like', "%$search%");
        })
            ->when($sortby, function ($query) use ($sortby, $order) {
                $query->orderBy($sortby, $order ?? 'asc');
            })
            ->get();
        return new CrudResource('success', 'Data Village', $data);
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
        Village::create($data_req);

        $data = Village::latest()->first();

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

        Village::find($id)->update($data_req);

        $data = Village::find($id);

        return new CrudResource('success', 'Data Berhasil Diubah', $data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Village::findOrFail($id);
        // delete data
        $data->delete();

        return new CrudResource('success', 'Data Berhasil Dihapus', $data);
    }
}
