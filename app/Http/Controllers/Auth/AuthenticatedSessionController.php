<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthenticatedSessionController
{
    protected function spartaValidation($request, $id = "")
    {
        $required = "";
        if ($id == "") {
            $required = "required";
        }
        $rules = [
            'email' => 'required|unique:users,email,' . $id,
            'name' => 'required',
            'password' => 'required',
            'password_confirmation' => 'required|same:password',
        ];

        $messages = [
            'email.required' => 'Email harus diisi.',
            'email.unique' => 'Email sudah ada.',
            'name.required' => 'Nama harus diisi.',
            'password.required' => 'Password harus diisi.',
            'password_confirmation.required' => 'Konfirmasi Password harus diisi.',
            'password_confirmation.same' => 'Password dan Konfirmasi Password harus sama.',
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
     * Handle an incoming authentication request.
     */
    public function store(Request $request)
    {
        $data_req = $request->all();
        $rules = [
            'email' => 'required|email', // Memastikan bahwa email diisi dan valid
            'password' => 'required' // Memastikan password diisi
        ];

        $messages = [
            'email.required' => 'Email harus diisi.',
            'email.email' => 'Format email tidak valid.',
            'password.required' => 'Password harus diisi.'
        ];

        $validator = Validator::make($data_req, $rules, $messages);

        if ($validator->fails()) {
            $message = [
                'judul' => 'Gagal',
                'type' => 'error',
                'message' => $validator->errors()->first(),
            ];
            return response()->json($message, 400);
        }

        // Mencoba untuk melakukan autentikasi menggunakan email dan password
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Autentikasi berhasil
            return redirect()->intended('/'); // Redirect ke dashboard atau halaman yang diinginkan
        }

        // Jika autentikasi gagal, kirimkan pesan error
        return response()->json([
            'judul' => 'Gagal',
            'type' => 'error',
            'message' => 'Email atau password salah.'
        ], 401);
    }

    // register
    public function register(Request $request)
    {
        $data_req = $request->all();
        // return $data_req;
        $validate = $this->spartaValidation($data_req);
        if ($validate) {
            return $validate;
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 'user',
        ]);

        Auth::login($user);

        return response()->json(['message' => 'Registration successful', 'user' => $user]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/'); // Redirect ke halaman login setelah logout
    }

    // status
    public function status()
    {
        $user = User::with('userInfo.village.subDistrict')->where('id', Auth::id())->first();
        return response()->json(['user' => $user]);
    }
}
