<?php

namespace App\Policies;

use App\Models\PropertyManager;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PropertyManagerPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, PropertyManager $propertyManager): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return !$user->propertyManager; // Can only create if they don't have one
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, PropertyManager $propertyManager): bool
    {
        return $user->id === $propertyManager->user_id || $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, PropertyManager $propertyManager): bool
    {
        return $user->id === $propertyManager->user_id || $user->isAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, PropertyManager $propertyManager): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, PropertyManager $propertyManager): bool
    {
        return $user->isAdmin();
    }
}
