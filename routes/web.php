<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertyManagerController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserManagementController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Public search routes
Route::get('/search', [SearchController::class, 'index'])->name('search');
Route::get('/search/map-data', [SearchController::class, 'mapData'])->name('search.map-data');

// Public property manager profiles
Route::get('/property-managers', [PropertyManagerController::class, 'index'])->name('property-managers.index');
Route::get('/property-managers/{propertyManager}', [PropertyManagerController::class, 'show'])->name('property-managers.show');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard (role-based)
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Property Manager CRUD (for managers)
    Route::get('/property-managers/create', [PropertyManagerController::class, 'create'])->name('property-managers.create');
    Route::post('/property-managers', [PropertyManagerController::class, 'store'])->name('property-managers.store');
    Route::get('/property-managers/{propertyManager}/edit', [PropertyManagerController::class, 'edit'])->name('property-managers.edit');
    Route::put('/property-managers/{propertyManager}', [PropertyManagerController::class, 'update'])->name('property-managers.update');
    Route::delete('/property-managers/{propertyManager}', [PropertyManagerController::class, 'destroy'])->name('property-managers.destroy');
    Route::post('/property-managers/{propertyManager}/toggle-save', [PropertyManagerController::class, 'toggleSave'])->name('property-managers.toggle-save');

    // Gallery management
    Route::post('/property-managers/{propertyManager}/gallery', [PropertyManagerController::class, 'uploadGallery'])->name('property-managers.gallery.upload');
    Route::delete('/property-managers/{propertyManager}/gallery/{image}', [PropertyManagerController::class, 'deleteGalleryImage'])->name('property-managers.gallery.delete');

    // Verification documents
    Route::post('/property-managers/{propertyManager}/verification-documents', [PropertyManagerController::class, 'uploadVerificationDocuments'])->name('property-managers.verification.upload');
    Route::delete('/property-managers/{propertyManager}/verification-documents/{document}', [PropertyManagerController::class, 'deleteVerificationDocument'])->name('property-managers.verification.delete');
    Route::post('/property-managers/{propertyManager}/submit-verification', [PropertyManagerController::class, 'submitForVerification'])->name('property-managers.verification.submit');

    // Inquiries
    Route::resource('inquiries', InquiryController::class);
    Route::post('/inquiries/{inquiry}/reply', [InquiryController::class, 'reply'])->name('inquiries.reply');

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/inquiries/{inquiry}/messages', [NotificationController::class, 'inquiryMessages'])->name('inquiries.messages');
    Route::post('/notifications/mark-read', [NotificationController::class, 'markAllRead'])->name('notifications.mark-read');

    // Reviews
    Route::get('/reviews/create', [ReviewController::class, 'create'])->name('reviews.create');
    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
    Route::get('/reviews/{review}/edit', [ReviewController::class, 'edit'])->name('reviews.edit');
    Route::put('/reviews/{review}', [ReviewController::class, 'update'])->name('reviews.update');
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');
});

// Admin routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/verification-queue', [AdminController::class, 'verificationQueue'])->name('verification-queue');
    Route::get('/verification-review/{propertyManager}', [AdminController::class, 'reviewVerification'])->name('verification-review');
    Route::post('/verify/{propertyManager}', [AdminController::class, 'verify'])->name('verify');
    Route::post('/reject/{propertyManager}', [AdminController::class, 'reject'])->name('reject');
    Route::post('/unverify/{propertyManager}', [AdminController::class, 'unverify'])->name('unverify');
    Route::post('/review-document/{document}', [AdminController::class, 'reviewDocument'])->name('review-document');
    Route::resource('users', UserManagementController::class);
});

require __DIR__.'/auth.php';
