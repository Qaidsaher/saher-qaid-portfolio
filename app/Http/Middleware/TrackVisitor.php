<?php

namespace App\Http\Middleware;

use App\Models\Visitor;
use Closure;
use Illuminate\Http\Request;
use Torann\GeoIP\Facades\GeoIP;

class TrackVisitor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
    //     $sessionId = session()->getId();
    //     $ip = $request->ip();

    //     // If running locally, avoid GeoIP lookup which returns the default location.
    //     if ($ip === '127.0.0.1' || $ip === '::1') {
    //         $country = 'Localhost';
    //     } else {
    //         // Retrieve location information using the GeoIP package.
    //         $location = GeoIP::getLocation($ip);
    //         $country = $location['country'] ?? 'Unknown';
    //     }

        // Visitor::updateOrCreate(
        //     ['session_id' => $sessionId],
        //     [
        //         'last_active' => now(),
        //         'ip'          => $ip,
        //         'country'     => $country,
        //     ]
        // );

        return $next($request);
    }
}
