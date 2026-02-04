<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UpdateLastActiveAt
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check()) {
            $user = auth()->user();
            
            // Only update every minute to reduce database writes
            if (!$user->last_active_at || $user->last_active_at->lt(now()->subMinute())) {
                $user->update(['last_active_at' => now()]);
            }
        }

        return $next($request);
    }
}
