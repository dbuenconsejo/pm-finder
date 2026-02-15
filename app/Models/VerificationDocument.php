<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class VerificationDocument extends Model
{
    protected $fillable = [
        'property_manager_id',
        'document_type',
        'document_name',
        'file_path',
        'status',
        'admin_notes',
        'reviewed_by',
        'reviewed_at',
    ];

    protected $casts = [
        'reviewed_at' => 'datetime',
    ];

    protected $appends = ['file_url', 'is_image'];

    public function propertyManager(): BelongsTo
    {
        return $this->belongsTo(PropertyManager::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * Get the full URL for the document file.
     */
    public function getFileUrlAttribute(): ?string
    {
        if ($this->file_path && Storage::disk('public')->exists($this->file_path)) {
            return Storage::disk('public')->url($this->file_path);
        }
        return null;
    }

    /**
     * Check if this is an image file (for preview purposes).
     */
    public function getIsImageAttribute(): bool
    {
        $extension = strtolower(pathinfo($this->file_path, PATHINFO_EXTENSION));
        return in_array($extension, ['jpg', 'jpeg', 'png', 'webp']);
    }

    public static function documentTypes(): array
    {
        return [
            'government_id' => 'Government-Issued ID',
            'business_permit' => 'Business Permit / License',
            'certification' => 'Professional Certification',
            'proof_of_address' => 'Proof of Address',
            'other' => 'Other Supporting Document',
        ];
    }
}
