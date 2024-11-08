<?php

namespace App\Http\Controllers\CRUD;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\CrudResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\TOOLS\ImgToolsController;

class BannerController
{
    protected $imgController;
    // make construct
    public function __construct()
    {
        // memanggil controller image
        $this->imgController = new ImgToolsController();
    }
    protected function spartaValidation($request, $id = "")
    {
        $required = "";
        if ($id == "") {
            $required = "required";
        }
        $rules = [
            'banner_img' => "$required|nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
            'position' => 'required|unique:banners,position,' . $id,
        ];

        $messages = [
            'banner_img.required' => 'Foto harus diisi.',
            'banner_img.image' => 'File harus berupa gambar.',
            'banner_img.mimes' => 'File harus berupa jpeg,png,jpg,gif,svg.',
            'banner_img.max' => 'File maksimal 2MB.',
            'position.required' => 'Posisi harus diisi.',
            'position.unique' => 'Posisi sudah ada.',
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
        $data = Banner::orderBy($sortby ?? 'created_at', $order ?? 'desc')
            ->get();
        return new CrudResource('success', 'Data Banner', $data);
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
        $validate = $this->spartaValidation($data_req);
        if ($validate) {
            return $validate;
        }
        // unset user
        unset($data_req['user']);
        DB::beginTransaction();
        try {
            // export foto
            if ($request->hasFile('banner_img')) {
                $banner_img = $this->imgController->addImage('banner_img', $data_req['banner_img']);
                // jika foto gagal di upload
                if (!$banner_img) {
                    DB::rollback();
                    return new CrudResource('error', 'Gagal Upload Foto', null);
                }
                $data_req['banner_img'] = "storage/$banner_img";
            }

            // add data
            Banner::create($data_req);
            // get last data
            $data = Banner::latest()->first();
            // add options
            DB::commit();
            return new CrudResource('success', 'Data Berhasil Disimpan', $data);
        } catch (\Throwable $th) {
            // jika terdapat kesalahan
            DB::rollback();
            $message = [
                'judul' => 'Gagal',
                'type' => 'error',
                'message' => $th->getMessage(),
            ];
            return response()->json($message, 400);
        }
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
        $validate = $this->spartaValidation($data_req, $id);
        if ($validate) {
            return $validate;
        }
        // unset user
        unset($data_req['user']);
        unset($data_req['_method']);
        DB::beginTransaction();
        try {
            $banner = Banner::findOrFail($id);
            // find file banner_img
            $banner_img = $banner->banner_img;
            // export banner_img
            if ($request->hasFile('banner_img')) {
                // remove file banner_img jika ada
                if ($banner_img) {
                    File::delete($banner_img);
                }
                $banner_img = $this->imgController->addImage('banner_img', $data_req['banner_img']);
                if (!$banner_img) {
                    return new CrudResource('error', 'Gagal Upload Banner_img', null);
                }
                $data_req['banner_img'] = "storage/$banner_img";
            } else {
                $data_req['banner_img'] = $banner_img;
            }
            // Update the content
            $banner->update($data_req);
            DB::commit();
            return new CrudResource('success', 'Data Berhasil Diperbarui', $banner);
        } catch (\Throwable $th) {
            // Jika terdapat kesalahan
            DB::rollback();
            $message = [
                'judul' => 'Gagal',
                'type' => 'error',
                'message' => $th->getMessage(),
            ];
            return response()->json($message, 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Banner::findOrFail($id);
        // get banner_img
        $banner_img = $data->banner_img;
        // remove banner_img banner_img
        if ($banner_img) {
            File::delete($banner_img);
        }
        // delete data
        $data->delete();

        return new CrudResource('success', 'Data Berhasil Dihapus', $data);
    }
}
