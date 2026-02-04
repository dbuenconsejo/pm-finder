<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\PropertyManager;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $propertyManager = PropertyManager::with('user')
            ->findOrFail($request->query('property_manager_id'));

        return Inertia::render('Reviews/Create', [
            'propertyManager' => $propertyManager,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'property_manager_id' => 'required|exists:property_managers,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        // Check if user already reviewed this PM
        $existingReview = Review::where('user_id', auth()->id())
            ->where('property_manager_id', $validated['property_manager_id'])
            ->first();

        if ($existingReview) {
            return back()->withErrors(['rating' => 'You have already reviewed this property manager.']);
        }

        Review::create([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('property-managers.show', $validated['property_manager_id'])
            ->with('success', 'Review submitted successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        $this->authorize('update', $review);

        return Inertia::render('Reviews/Edit', [
            'review' => $review->load('propertyManager.user'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        $this->authorize('update', $review);

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $review->update($validated);

        return redirect()->route('property-managers.show', $review->property_manager_id)
            ->with('success', 'Review updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $this->authorize('delete', $review);

        $propertyManagerId = $review->property_manager_id;
        $review->delete();

        return redirect()->route('property-managers.show', $propertyManagerId)
            ->with('success', 'Review deleted successfully!');
    }
}
