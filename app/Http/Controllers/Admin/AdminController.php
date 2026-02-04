<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PropertyManager;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function verificationQueue()
    {
        $pendingManagers = PropertyManager::with('user')
            ->where('is_verified', false)
            ->orderByDesc('created_at')
            ->paginate(10);

        return Inertia::render('Admin/VerificationQueue', [
            'pendingManagers' => $pendingManagers,
        ]);
    }

    public function verify(PropertyManager $propertyManager)
    {
        $propertyManager->update(['is_verified' => true]);

        return back()->with('success', 'Property manager verified successfully!');
    }

    public function unverify(PropertyManager $propertyManager)
    {
        $propertyManager->update(['is_verified' => false]);

        return back()->with('success', 'Property manager verification revoked.');
    }
}
