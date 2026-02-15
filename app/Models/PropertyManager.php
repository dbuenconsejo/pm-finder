<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;

class PropertyManager extends Model
{
    protected $fillable = [
        'user_id',
        'business_name',
        'bio',
        'phone',
        'avatar',
        'services',
        'service_types',
        'latitude',
        'longitude',
        'address',
        'city',
        'province',
        'barangay',
        'service_radius_km',
        'is_verified',
        'is_available',
        'rating',
        'review_count',
        'profile_views',
    ];

    protected $casts = [
        'services' => 'array',
        'service_types' => 'array',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'service_radius_km' => 'decimal:2',
        'is_verified' => 'boolean',
        'is_available' => 'boolean',
        'rating' => 'decimal:1',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function properties(): HasMany
    {
        return $this->hasMany(Property::class);
    }

    public function serviceAreas(): HasMany
    {
        return $this->hasMany(ServiceArea::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function inquiries(): HasMany
    {
        return $this->hasMany(Inquiry::class);
    }

    public function galleryImages(): HasMany
    {
        return $this->hasMany(GalleryImage::class)->orderBy('sort_order');
    }

    public function savedByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'saved_property_managers')
            ->withTimestamps();
    }

    /**
     * Get the full URL for the avatar image.
     */
    public function getAvatarUrlAttribute(): ?string
    {
        if ($this->avatar && Storage::disk('public')->exists($this->avatar)) {
            return Storage::disk('public')->url($this->avatar);
        }
        return null;
    }

    public function updateRating(): void
    {
        $this->rating = $this->reviews()->avg('rating') ?? 0;
        $this->review_count = $this->reviews()->count();
        $this->save();
    }

    /**
     * Check if the property manager's user is currently online
     */
    public function isOnline(): bool
    {
        return $this->user ? $this->user->isOnline() : false;
    }

    /**
     * Append is_online to array/JSON serialization
     */
    protected $appends = ['is_online', 'avatar_url'];

    /**
     * Get the is_online attribute
     */
    public function getIsOnlineAttribute(): bool
    {
        return $this->isOnline();
    }
}
