<?php

namespace App\Http\Controllers;

use App\Models\PropertyManager;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = PropertyManager::with(['user', 'serviceAreas'])
            ->where('is_available', true);

        // Location search
        if ($request->filled('location')) {
            $location = $request->input('location');
            $query->where(function ($q) use ($location) {
                $q->where('province', 'like', "%{$location}%")
                    ->orWhere('city', 'like', "%{$location}%")
                    ->orWhere('barangay', 'like', "%{$location}%")
                    ->orWhereHas('serviceAreas', function ($sq) use ($location) {
                        $sq->where('province', 'like', "%{$location}%")
                            ->orWhere('city', 'like', "%{$location}%")
                            ->orWhere('barangay', 'like', "%{$location}%");
                    });
            });
        }

        // Service type filter
        if ($request->filled('service_type')) {
            $serviceType = $request->input('service_type');
            $query->whereJsonContains('service_types', $serviceType);
        }

        // Rating filter
        if ($request->filled('min_rating')) {
            $query->where('rating', '>=', $request->input('min_rating'));
        }

        // Verified only filter
        if ($request->boolean('verified_only')) {
            $query->where('is_verified', true);
        }

        // Radius filter (if lat/lng provided)
        if ($request->filled(['lat', 'lng', 'radius'])) {
            $lat = $request->input('lat');
            $lng = $request->input('lng');
            $radius = $request->input('radius', 10);

            $query->selectRaw("*, 
                (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance", 
                [$lat, $lng, $lat]
            )
            ->having('distance', '<=', $radius)
            ->orderBy('distance');
        } else {
            $query->orderByDesc('rating');
        }

        $propertyManagers = $query->paginate(12)->withQueryString();

        return Inertia::render('Search/Index', [
            'propertyManagers' => $propertyManagers,
            'filters' => $request->only(['location', 'service_type', 'min_rating', 'verified_only', 'lat', 'lng', 'radius']),
        ]);
    }

    public function mapData(Request $request)
    {
        $query = PropertyManager::with('user')
            ->where('is_available', true)
            ->whereNotNull('latitude')
            ->whereNotNull('longitude');

        if ($request->filled('location')) {
            $location = $request->input('location');
            $query->where(function ($q) use ($location) {
                $q->where('province', 'like', "%{$location}%")
                    ->orWhere('city', 'like', "%{$location}%")
                    ->orWhere('barangay', 'like', "%{$location}%");
            });
        }

        $managers = $query->get(['id', 'user_id', 'business_name', 'latitude', 'longitude', 'rating', 'is_verified', 'city', 'province']);

        return response()->json($managers);
    }
}
