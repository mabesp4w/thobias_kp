<?php

namespace App\Http\Controllers\CRUD;

use App\Http\Resources\CrudResource;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Village;
use App\Models\UserInfo;
use Illuminate\Http\Request;

class UserInfoController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userInfos = UserInfo::with(['user', 'village'])->get();
        return Inertia::render('UserInfo/Index', [
            'userInfos' => $userInfos,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all(['id', 'name']);
        $villages = Village::all(['id', 'name']);

        return Inertia::render('UserInfo/Create', [
            'users' => $users,
            'villages' => $villages,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'village_id' => 'required|exists:villages,id',
            'nm_user' => 'required|string|max:100',
            'phone_number' => 'required|string|max:15',
            'address' => 'required|string|max:100',
            'is_active' => 'required|boolean',
        ]);

        UserInfo::create($validated);

        return new CrudResource('success', 'Data User Info', $validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userInfo = User::with('userInfo.village.subDistrict')->findOrFail($id);
        return new CrudResource('success', 'Data User Info', $userInfo);
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

        UserInfo::find($id)->update($data_req);
        $data = UserInfo::find($id);

        return new CrudResource('success', 'Data User Info', $data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
