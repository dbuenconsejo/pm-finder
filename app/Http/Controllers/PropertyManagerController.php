<?php

namespace App\Http\Controllers;

use App\Models\PropertyManager;
use App\Models\Property;
use App\Models\ServiceArea;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $propertyManagers = PropertyManager::with(['user', 'serviceAreas'])
            ->where('is_available', true)
            ->paginate(12);

        return Inertia::render('PropertyManagers/Index', [
            'propertyManagers' => $propertyManagers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('PropertyManagers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'business_name' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'services' => 'nullable|array',
            'service_types' => 'nullable|array',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'province' => 'nullable|string|max:100',
            'barangay' => 'nullable|string|max:100',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'service_radius_km' => 'nullable|numeric|min:1|max:100',
        ]);

        $propertyManager = PropertyManager::create([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        // Update user role to manager
        auth()->user()->update(['role' => 'manager']);

        return redirect()->route('property-managers.show', $propertyManager)
            ->with('success', 'Profile created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(PropertyManager $propertyManager)
    {
        $propertyManager->increment('profile_views');

        $propertyManager->load(['user', 'properties', 'serviceAreas', 'reviews.user']);

        $isSaved = auth()->check() 
            ? auth()->user()->savedPropertyManagers()->where('property_manager_id', $propertyManager->id)->exists()
            : false;

        return Inertia::render('PropertyManagers/Show', [
            'propertyManager' => $propertyManager,
            'isSaved' => $isSaved,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PropertyManager $propertyManager)
    {
        $this->authorize('update', $propertyManager);

        $propertyManager->load(['properties', 'serviceAreas']);

        return Inertia::render('PropertyManagers/Edit', [
            'propertyManager' => $propertyManager,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PropertyManager $propertyManager)
    {
        $this->authorize('update', $propertyManager);

        $validated = $request->validate([
            'business_name' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'services' => 'nullable|array',
            'service_types' => 'nullable|array',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'province' => 'nullable|string|max:100',
            'barangay' => 'nullable|string|max:100',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'service_radius_km' => 'nullable|numeric|min:1|max:100',
            'is_available' => 'boolean',
        ]);

        $propertyManager->update($validated);

        return redirect()->route('property-managers.show', $propertyManager)
            ->with('success', 'Profile updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PropertyManager $propertyManager)
    {
        $this->authorize('delete', $propertyManager);

        $propertyManager->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Profile deleted successfully!');
    }

    /**
     * Toggle save/unsave a property manager.
     */
    public function toggleSave(PropertyManager $propertyManager)
    {
        $user = auth()->user();
        
        if ($user->savedPropertyManagers()->where('property_manager_id', $propertyManager->id)->exists()) {
            $user->savedPropertyManagers()->detach($propertyManager->id);
            $message = 'Property manager removed from saved list.';
        } else {
            $user->savedPropertyManagers()->attach($propertyManager->id);
            $message = 'Property manager saved successfully!';
        }

        return back()->with('success', $message);
    }
}
