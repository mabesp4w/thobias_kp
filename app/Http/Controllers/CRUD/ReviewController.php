<?php

namespace App\Http\Controllers\CRUD;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\CrudResource;
use App\Models\Order;
use Illuminate\Support\Facades\Validator;

class ReviewController
{
    protected function spartaValidation($request, $id = "")
    {
        $required = "";
        if ($id == "") {
            $required = "required";
        }
        $rules = [
            'user_id' => 'required',
        ];

        $messages = [
            'user_id.required' => 'Nama Review harus diisi.',
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
        $order = $request->review;

        $review = Review::with(['product', 'user'])
            ->orderBy($sortby ?? 'created_at', $order ?? 'desc')
            ->get();

        return new CrudResource('success', 'Data Review', $review);
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

        // return $data_req;

        DB::beginTransaction();
        try {
            foreach ($request->product_id as $key => $item) {
                Review::create([
                    'user_id' => $data_req['user_id'],
                    'product_id' => $item,
                    'order_id' => $data_req['order_id'],
                    'rating' => $data_req['rating'][$key],
                    'comment' => $data_req['comment'][$key],
                ]);
            }
            // update order
            Order::where('id', $data_req['order_id'])->update(['status' => 'selesai']);
            $data = Review::with(['product', 'user'])->where('order_id', $data_req['order_id'])->get();
            DB::commit();
            return new CrudResource('success', 'Data Berhasil Disimpan', $data);
        } catch (\Throwable $th) {
            DB::rollBack();
            // error
            return response()->json(['message' => $th->getMessage()], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Review::with(['product', 'user'])->where('order_id', $id)->get();
        return new CrudResource('success', 'Data Review', $data);
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

        $review = Review::findOrFail($id);
        $review->update($request->only(['user_id']));

        return new CrudResource('success', 'Data Berhasil Diubah', $review->load('reviewItems'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Review::findOrFail($id);
        // delete data
        $data->delete();

        return new CrudResource('success', 'Data Berhasil Dihapus', $data);
    }
}
