<?php

namespace App\Http\Controllers;

use App\Models\PropertyManager;
use App\Models\Property;
use App\Models\GalleryImage;
use App\Models\VerificationDocument;
use App\Models\ServiceArea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'avatar' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
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

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
        }

        unset($validated['avatar_file']); // safety cleanup

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

        $propertyManager->load(['user', 'properties', 'serviceAreas', 'reviews.user', 'galleryImages']);

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

        $propertyManager->load(['properties', 'serviceAreas', 'galleryImages', 'verificationDocuments']);

        return Inertia::render('PropertyManagers/Edit', [
            'propertyManager' => $propertyManager,
            'documentTypes' => VerificationDocument::documentTypes(),
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
            'avatar' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
            'remove_avatar' => 'nullable|boolean',
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

        // Handle avatar removal
        if ($request->boolean('remove_avatar')) {
            if ($propertyManager->avatar) {
                Storage::disk('public')->delete($propertyManager->avatar);
            }
            $validated['avatar'] = null;
        }
        // Handle avatar upload
        elseif ($request->hasFile('avatar')) {
            // Delete old avatar
            if ($propertyManager->avatar) {
                Storage::disk('public')->delete($propertyManager->avatar);
            }
            $validated['avatar'] = $request->file('avatar')->store('avatars', 'public');
        } else {
            unset($validated['avatar']);
        }

        unset($validated['remove_avatar']);

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

        // Clean up uploaded files
        if ($propertyManager->avatar) {
            Storage::disk('public')->delete($propertyManager->avatar);
        }
        foreach ($propertyManager->galleryImages as $image) {
            Storage::disk('public')->delete($image->image_path);
        }
        foreach ($propertyManager->properties as $property) {
            if ($property->image) {
                Storage::disk('public')->delete($property->image);
            }
        }

        $propertyManager->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Profile deleted successfully!');
    }

    /**
     * Upload gallery images.
     */
    public function uploadGallery(Request $request, PropertyManager $propertyManager)
    {
        $this->authorize('update', $propertyManager);

        $request->validate([
            'images' => 'required|array|max:20',
            'images.*' => 'image|mimes:jpeg,png,webp|max:5120',
            'captions' => 'nullable|array',
            'captions.*' => 'nullable|string|max:255',
        ]);

        $currentCount = $propertyManager->galleryImages()->count();
        $maxImages = 20;

        if ($currentCount >= $maxImages) {
            return back()->withErrors(['images' => 'Maximum of 20 gallery images allowed.']);
        }

        $allowedCount = min(count($request->file('images')), $maxImages - $currentCount);
        $sortOrder = $currentCount;

        foreach (array_slice($request->file('images'), 0, $allowedCount) as $index => $image) {
            $path = $image->store('gallery', 'public');
            $propertyManager->galleryImages()->create([
                'image_path' => $path,
                'caption' => $request->input("captions.{$index}"),
                'sort_order' => $sortOrder++,
            ]);
        }

        return back()->with('success', 'Gallery images uploaded successfully!');
    }

    /**
     * Remove a gallery image.
     */
    public function deleteGalleryImage(PropertyManager $propertyManager, GalleryImage $image)
    {
        $this->authorize('update', $propertyManager);

        if ($image->property_manager_id !== $propertyManager->id) {
            abort(403);
        }

        Storage::disk('public')->delete($image->image_path);
        $image->delete();

        return back()->with('success', 'Image removed.');
    }

    /**
     * Upload verification documents.
     */
    public function uploadVerificationDocuments(Request $request, PropertyManager $propertyManager)
    {
        $this->authorize('update', $propertyManager);

        $request->validate([
            'documents' => 'required|array|max:10',
            'documents.*.file' => 'required|file|mimes:jpeg,png,webp,pdf|max:10240',
            'documents.*.document_type' => 'required|string|in:government_id,business_permit,certification,proof_of_address,other',
            'documents.*.document_name' => 'nullable|string|max:255',
        ]);

        foreach ($request->documents as $doc) {
            $path = $doc['file']->store('verifications', 'public');
            $propertyManager->verificationDocuments()->create([
                'document_type' => $doc['document_type'],
                'document_name' => $doc['document_name'] ?? $doc['file']->getClientOriginalName(),
                'file_path' => $path,
                'status' => 'pending',
            ]);
        }

        return back()->with('success', 'Documents uploaded successfully!');
    }

    /**
     * Delete a verification document.
     */
    public function deleteVerificationDocument(PropertyManager $propertyManager, VerificationDocument $document)
    {
        $this->authorize('update', $propertyManager);

        if ($document->property_manager_id !== $propertyManager->id) {
            abort(403);
        }

        // Only allow deletion of pending or rejected documents
        if ($document->status === 'approved') {
            return back()->withErrors(['document' => 'Cannot delete an approved document.']);
        }

        Storage::disk('public')->delete($document->file_path);
        $document->delete();

        return back()->with('success', 'Document removed.');
    }

    /**
     * Submit documents for verification review.
     */
    public function submitForVerification(PropertyManager $propertyManager)
    {
        $this->authorize('update', $propertyManager);

        $pendingDocs = $propertyManager->verificationDocuments()->where('status', 'pending')->count();

        if ($pendingDocs === 0) {
            return back()->withErrors(['documents' => 'Please upload at least one document before submitting.']);
        }

        $propertyManager->update([
            'verification_status' => 'pending',
            'verification_submitted_at' => now(),
            'verification_notes' => null,
        ]);

        return back()->with('success', 'Your documents have been submitted for verification review!');
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
