<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Register - returns user and sets httpOnly cookie
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    // Login - sets cookie
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (! $token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    // Me - returns current user (relies on AttachTokenFromCookie)
    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(null, 401);
        }
    }

    // Logout - invalidate token & clear cookie
    public function logout(Request $request)
    {
        try {
           JWTAuth::invalidate(JWTAuth::getToken());
        } catch (\Exception $e) {
            // ignore
        }

        return response()->json(['message' => 'Logged out']);
    }

}