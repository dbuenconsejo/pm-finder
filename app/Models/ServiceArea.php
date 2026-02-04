<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceArea extends Model
{
    protected $fillable = [
        'property_manager_id',
        'province',
        'city',
        'barangay',
    ];

    public function propertyManager(): BelongsTo
    {
        return $this->belongsTo(PropertyManager::class);
    }
}
