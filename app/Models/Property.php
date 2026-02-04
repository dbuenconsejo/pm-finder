<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Property extends Model
{
    protected $fillable = [
        'property_manager_id',
        'title',
        'description',
        'property_type',
        'image',
        'location',
        'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];

    public function propertyManager(): BelongsTo
    {
        return $this->belongsTo(PropertyManager::class);
    }
}
