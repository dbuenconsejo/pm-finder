<?php

namespace App\Policies;

use App\Models\Inquiry;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class InquiryPolicy
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
     * User can view if they're the sender or the property manager receiving it
     */
    public function view(User $user, Inquiry $inquiry): bool
    {
        // Check if user is the inquiry sender
        if ($user->id === $inquiry->user_id) {
            return true;
        }

        // Check if user is the property manager receiving the inquiry
        if ($user->propertyManager && $user->propertyManager->id === $inquiry->property_manager_id) {
            return true;
        }

        // Admin can view all
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can create models.
     * Any authenticated user (property owner) can create inquiries
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     * Only the inquiry sender or receiving PM can update (e.g., status change)
     */
    public function update(User $user, Inquiry $inquiry): bool
    {
        if ($user->id === $inquiry->user_id) {
            return true;
        }

        if ($user->propertyManager && $user->propertyManager->id === $inquiry->property_manager_id) {
            return true;
        }

        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     * Only the inquiry sender can delete their inquiry
     */
    public function delete(User $user, Inquiry $inquiry): bool
    {
        return $user->id === $inquiry->user_id || $user->isAdmin();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Inquiry $inquiry): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Inquiry $inquiry): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can reply to the inquiry.
     * Only the property manager receiving the inquiry can reply
     */
    public function reply(User $user, Inquiry $inquiry): bool
    {
        // Both parties can reply to continue the conversation
        if ($user->id === $inquiry->user_id) {
            return true;
        }

        if ($user->propertyManager && $user->propertyManager->id === $inquiry->property_manager_id) {
            return true;
        }

        return false;
    }
}
