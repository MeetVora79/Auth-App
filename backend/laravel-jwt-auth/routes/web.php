<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/check', function () {
    try {
        \DB::connection()->getPdo();
        return '✅ Database connected successfully!';
    } catch (Exception $e) {
        return '❌ DB Connection Error: ' . $e->getMessage();
    }
});

Route::get('/migrate', function () {
    \Artisan::call('migrate', ['--force' => true]);
    return '✅ Migrations completed.';
});
