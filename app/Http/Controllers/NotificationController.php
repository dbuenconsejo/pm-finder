<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Inquiry;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Get unread message count and recent notifications.
     */
    public function index()
    {
        $user = auth()->user();
        
        // Get inquiries where user is a participant
        if ($user->isManager() && $user->propertyManager) {
            $inquiryIds = Inquiry::where('property_manager_id', $user->propertyManager->id)
                ->pluck('id');
        } else {
            $inquiryIds = Inquiry::where('user_id', $user->id)->pluck('id');
        }

        // Count unread messages not sent by the current user
        $unreadCount = Message::whereIn('inquiry_id', $inquiryIds)
            ->where('sender_id', '!=', $user->id)
            ->where('is_read', false)
            ->count();

        // Get recent unread messages with inquiry info
        $recentNotifications = Message::with(['inquiry.propertyManager.user', 'inquiry.user', 'sender'])
            ->whereIn('inquiry_id', $inquiryIds)
            ->where('sender_id', '!=', $user->id)
            ->where('is_read', false)
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(function ($message) use ($user) {
                return [
                    'id' => $message->id,
                    'inquiry_id' => $message->inquiry_id,
                    'subject' => $message->inquiry->subject,
                    'sender_name' => $message->sender->name,
                    'preview' => \Str::limit($message->content, 50),
                    'created_at' => $message->created_at->diffForHumans(),
                ];
            });

        return response()->json([
            'unread_count' => $unreadCount,
            'notifications' => $recentNotifications,
        ]);
    }

    /**
     * Get new messages for a specific inquiry (for polling).
     */
    public function inquiryMessages(Inquiry $inquiry, Request $request)
    {
        $this->authorize('view', $inquiry);
        
        $lastMessageId = $request->query('last_message_id', 0);
        
        $newMessages = $inquiry->messages()
            ->with('sender')
            ->where('id', '>', $lastMessageId)
            ->orderBy('created_at')
            ->get();

        // Mark messages as read
        $inquiry->messages()
            ->where('sender_id', '!=', auth()->id())
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json([
            'messages' => $newMessages,
        ]);
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllRead()
    {
        $user = auth()->user();
        
        if ($user->isManager() && $user->propertyManager) {
            $inquiryIds = Inquiry::where('property_manager_id', $user->propertyManager->id)
                ->pluck('id');
        } else {
            $inquiryIds = Inquiry::where('user_id', $user->id)->pluck('id');
        }

        Message::whereIn('inquiry_id', $inquiryIds)
            ->where('sender_id', '!=', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }
}
