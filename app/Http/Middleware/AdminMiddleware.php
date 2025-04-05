<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is logged in and is an admin.
        // Adjust the property "is_admin" based on your User model implementation.
        if (!$request->user() || !$request->user()->role === 'admin') {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
