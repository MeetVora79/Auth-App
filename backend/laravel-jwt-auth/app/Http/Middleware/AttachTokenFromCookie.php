<?php
// app/Http/Middleware/AttachTokenFromCookie.php
namespace App\Http\Middleware;

use Closure;

class AttachTokenFromCookie
{
    public function handle($request, Closure $next)
    {
        // If cookie 'token' exists and Authorization header not set, set it
        $token = $request->cookie('token');
        if ($token && ! $request->bearerToken()) {
            $request->headers->set('Authorization', 'Bearer ' . $token);
        }

        return $next($request);
    }
}