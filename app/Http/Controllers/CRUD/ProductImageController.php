<?php

namespace App\Http\Controllers\CRUD;

use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\CrudResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\TOOLS\ImgToolsController;

class ProductImageController
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
            'product_img' => "$required|nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
        ];

        $messages = [
            'product_img.required' => 'Foto harus diisi.',
            'product_img.image' => 'File harus berupa gambar.',
            'product_img.mimes' => 'File harus berupa jpeg,png,jpg,gif,svg.',
            'product_img.max' => 'File maksimal 2MB.',
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
        $product_id = $request->product_id;
        $data = ProductImage::where('product_id', $product_id)
            ->orderBy($sortby ?? 'created_at', $order ?? 'desc')
            ->get();
        return new CrudResource('success', 'Data ProductImage', $data);
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
            if ($request->hasFile('product_img')) {
                $product_img = $this->imgController->addImage('product_img', $data_req['product_img']);
                // jika foto gagal di upload
                if (!$product_img) {
                    DB::rollback();
                    return new CrudResource('error', 'Gagal Upload Foto', null);
                }
                $data_req['product_img'] = "storage/$product_img";
            }

            // add data
            ProductImage::create($data_req);
            // get last data
            $data = ProductImage::latest()->first();
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
            $productImage = ProductImage::findOrFail($id);
            // find file product_img
            $product_img = $productImage->product_img;
            // export product_img
            if ($request->hasFile('product_img')) {
                // remove file product_img jika ada
                if ($product_img) {
                    File::delete($product_img);
                }
                $product_img = $this->imgController->addImage('product_img', $data_req['product_img']);
                if (!$product_img) {
                    return new CrudResource('error', 'Gagal Upload Product_img', null);
                }
                $data_req['product_img'] = "storage/$product_img";
            } else {
                $data_req['product_img'] = $product_img;
            }
            // Update the content
            $productImage->update($data_req);
            DB::commit();
            return new CrudResource('success', 'Data Berhasil Diperbarui', $productImage);
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
        $data = ProductImage::findOrFail($id);
        // get product_img
        $product_img = $data->product_img;
        // remove product_img product_img
        if ($product_img) {
            File::delete($product_img);
        }
        // delete data
        $data->delete();

        return new CrudResource('success', 'Data Berhasil Dihapus', $data);
    }
}
