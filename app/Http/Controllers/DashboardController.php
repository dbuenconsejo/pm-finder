<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use App\Models\PropertyManager;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            return $this->adminDashboard();
        }

        if ($user->isManager()) {
            return $this->managerDashboard($user);
        }

        return $this->ownerDashboard($user);
    }

    protected function ownerDashboard($user)
    {
        $sentInquiries = Inquiry::where('user_id', $user->id)->count();
        $activeChats = Inquiry::where('user_id', $user->id)
            ->whereIn('status', ['pending', 'replied'])
            ->count();
        $savedPMs = $user->savedPropertyManagers()->count();
        
        // Count PMs whose users were active in the last 5 minutes
        $onlinePMs = PropertyManager::where('is_verified', true)
            ->whereHas('user', function ($query) {
                $query->where('last_active_at', '>=', now()->subMinutes(5));
            })
            ->count();
        $totalPMs = PropertyManager::where('is_verified', true)->count();

        $recentActivity = Inquiry::with(['propertyManager.user'])
            ->where('user_id', $user->id)
            ->orderByDesc('updated_at')
            ->take(5)
            ->get();

        $savedPropertyManagers = $user->savedPropertyManagers()
            ->with('user')
            ->take(6)
            ->get();

        return Inertia::render('Dashboard/Owner', [
            'stats' => [
                'sentInquiries' => $sentInquiries,
                'activeChats' => $activeChats,
                'savedPMs' => $savedPMs,
                'onlinePMs' => $onlinePMs,
                'totalPMs' => $totalPMs,
            ],
            'recentActivity' => $recentActivity,
            'savedPropertyManagers' => $savedPropertyManagers,
        ]);
    }

    protected function managerDashboard($user)
    {
        $propertyManager = $user->propertyManager;

        if (!$propertyManager) {
            return redirect()->route('property-managers.create')
                ->with('info', 'Please complete your property manager profile.');
        }

        $newInquiries = Inquiry::where('property_manager_id', $propertyManager->id)
            ->where('status', 'pending')
            ->count();
        $profileViews = $propertyManager->profile_views;
        $totalReviews = $propertyManager->review_count;

        $recentInquiries = Inquiry::with('user')
            ->where('property_manager_id', $propertyManager->id)
            ->orderByDesc('created_at')
            ->take(5)
            ->get();

        $recentReviews = $propertyManager->reviews()
            ->with('user')
            ->orderByDesc('created_at')
            ->take(5)
            ->get();

        return Inertia::render('Dashboard/Manager', [
            'propertyManager' => $propertyManager,
            'stats' => [
                'newInquiries' => $newInquiries,
                'profileViews' => $profileViews,
                'totalReviews' => $totalReviews,
                'rating' => $propertyManager->rating,
            ],
            'recentInquiries' => $recentInquiries,
            'recentReviews' => $recentReviews,
        ]);
    }

    protected function adminDashboard()
    {
        $totalUsers = User::count();
        $totalManagers = PropertyManager::count();
        $verifiedManagers = PropertyManager::where('is_verified', true)->count();
        $pendingVerification = PropertyManager::where('is_verified', false)->count();
        $totalInquiries = Inquiry::count();

        $recentUsers = User::orderByDesc('created_at')->take(10)->get();
        $pendingManagers = PropertyManager::with('user')
            ->where('is_verified', false)
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Dashboard/Admin', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalManagers' => $totalManagers,
                'verifiedManagers' => $verifiedManagers,
                'pendingVerification' => $pendingVerification,
                'totalInquiries' => $totalInquiries,
            ],
            'recentUsers' => $recentUsers,
            'pendingManagers' => $pendingManagers,
        ]);
    }
}
