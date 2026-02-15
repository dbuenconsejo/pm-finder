<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PropertyManager;
use App\Models\VerificationDocument;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function verificationQueue()
    {
        $pendingManagers = PropertyManager::with(['user', 'verificationDocuments'])
            ->where(function ($query) {
                $query->where('verification_status', 'pending')
                    ->orWhere(function ($q) {
                        $q->where('is_verified', false)
                            ->where('verification_status', 'unsubmitted');
                    });
            })
            ->orderByRaw("FIELD(verification_status, 'pending', 'unsubmitted', 'rejected', 'approved') ASC")
            ->orderByDesc('created_at')
            ->paginate(10);

        return Inertia::render('Admin/VerificationQueue', [
            'pendingManagers' => $pendingManagers,
        ]);
    }

    /**
     * Show verification review page for a specific property manager.
     */
    public function reviewVerification(PropertyManager $propertyManager)
    {
        $propertyManager->load(['user', 'verificationDocuments.reviewer', 'serviceAreas', 'properties']);

        return Inertia::render('Admin/VerificationReview', [
            'propertyManager' => $propertyManager,
        ]);
    }

    /**
     * Approve verification — mark PM as verified and approve all pending documents.
     */
    public function verify(PropertyManager $propertyManager)
    {
        $propertyManager->update([
            'is_verified' => true,
            'verification_status' => 'approved',
            'verification_notes' => null,
        ]);

        // Approve all pending documents
        $propertyManager->verificationDocuments()
            ->where('status', 'pending')
            ->update([
                'status' => 'approved',
                'reviewed_by' => auth()->id(),
                'reviewed_at' => now(),
            ]);

        return back()->with('success', 'Property manager verified successfully!');
    }

    /**
     * Reject verification with notes.
     */
    public function reject(Request $request, PropertyManager $propertyManager)
    {
        $request->validate([
            'notes' => 'required|string|max:1000',
        ]);

        $propertyManager->update([
            'is_verified' => false,
            'verification_status' => 'rejected',
            'verification_notes' => $request->notes,
        ]);

        // Reject all pending documents
        $propertyManager->verificationDocuments()
            ->where('status', 'pending')
            ->update([
                'status' => 'rejected',
                'admin_notes' => $request->notes,
                'reviewed_by' => auth()->id(),
                'reviewed_at' => now(),
            ]);

        return back()->with('success', 'Verification rejected with feedback.');
    }

    /**
     * Revoke verification (unverify).
     */
    public function unverify(PropertyManager $propertyManager)
    {
        $propertyManager->update([
            'is_verified' => false,
            'verification_status' => 'unsubmitted',
        ]);

        return back()->with('success', 'Property manager verification revoked.');
    }

    /**
     * Review a single document (approve/reject with notes).
     */
    public function reviewDocument(Request $request, VerificationDocument $document)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected',
            'admin_notes' => 'nullable|string|max:500',
        ]);

        $document->update([
            'status' => $request->status,
            'admin_notes' => $request->admin_notes,
            'reviewed_by' => auth()->id(),
            'reviewed_at' => now(),
        ]);

        return back()->with('success', 'Document ' . $request->status . '.');
    }
}
