<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class PasswordResetController extends Controller
{
    // Send reset email
    public function forgot(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = User::where('email', $request->email)->first();
        if (! $user) {
            // respond success to avoid leaking which emails exist
            return response()->json(['message' => 'If that email exists, a reset link has been sent.']);
        }

        $token = Password::createToken($user);
        $user->notify(new ResetPasswordNotification($token));

        return response()->json(['message' => 'If that email exists, a reset link has been sent.']);
    }

    // Reset password
    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|confirmed|min:6',
        ]);

        $status = Password::reset(
            $request->only('email','password','password_confirmation','token'),
            function ($user, $password) {
                $user->forceFill(['password' => Hash::make($password)])->save();
                // optionally invalidate all tokens for user by using JWTBlacklist or custom logic
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Password has been reset.']);
        }

        return response()->json(['message' => __($status)], 400);
    }
}