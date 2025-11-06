<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PasswordResetController;

Route::post('register', [AuthController::class,'register']);
Route::post('login', [AuthController::class,'login']);
Route::post('forgot-password', [PasswordResetController::class,'forgot']);
Route::post('reset-password', [PasswordResetController::class,'reset']);
Route::post('refresh', [AuthController::class, 'refresh']);


// Protected group (AttachTokenFromCookie ensures cookie token gets used)
Route::middleware(['api','jwt.auth'])->group(function () {
    Route::get('me', [AuthController::class,'me']);
    Route::post('logout', [AuthController::class,'logout']);

    // ✅ Admin-only route (must be inside jwt.auth)
    Route::get('admin-only', function () {
        return response()->json(['secret' => 'Only admin can see this']);
    })->middleware('jwt.auth:api');
});