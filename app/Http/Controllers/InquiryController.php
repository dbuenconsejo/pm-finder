<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use App\Models\PropertyManager;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        if ($user->isManager() && $user->propertyManager) {
            // Property manager sees inquiries sent to them
            $inquiries = Inquiry::with(['user', 'messages'])
                ->where('property_manager_id', $user->propertyManager->id)
                ->orderByDesc('created_at')
                ->paginate(10);
        } else {
            // Property owner sees their sent inquiries
            $inquiries = Inquiry::with(['propertyManager.user', 'messages'])
                ->where('user_id', $user->id)
                ->orderByDesc('created_at')
                ->paginate(10);
        }

        return Inertia::render('Inquiries/Index', [
            'inquiries' => $inquiries,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $propertyManager = PropertyManager::with('user')
            ->findOrFail($request->query('property_manager_id'));

        return Inertia::render('Inquiries/Create', [
            'propertyManager' => $propertyManager,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'property_manager_id' => 'required|exists:property_managers,id',
            'subject' => 'required|string|max:255',
            'property_type' => 'nullable|string|max:100',
            'property_location' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $inquiry = Inquiry::create([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        // Create the first message
        Message::create([
            'inquiry_id' => $inquiry->id,
            'sender_id' => auth()->id(),
            'content' => $validated['message'],
        ]);

        return redirect()->route('inquiries.show', $inquiry)
            ->with('success', 'Inquiry sent successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Inquiry $inquiry)
    {
        $this->authorize('view', $inquiry);

        $inquiry->load(['propertyManager.user', 'user', 'messages.sender']);

        // Mark unread messages as read
        $inquiry->messages()
            ->where('sender_id', '!=', auth()->id())
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return Inertia::render('Inquiries/Show', [
            'inquiry' => $inquiry,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inquiry $inquiry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inquiry $inquiry)
    {
        $this->authorize('update', $inquiry);

        $validated = $request->validate([
            'status' => 'required|in:pending,read,replied,closed',
        ]);

        $inquiry->update($validated);

        return back()->with('success', 'Inquiry status updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inquiry $inquiry)
    {
        $this->authorize('delete', $inquiry);

        $inquiry->delete();

        return redirect()->route('inquiries.index')
            ->with('success', 'Inquiry deleted successfully.');
    }

    /**
     * Reply to an inquiry.
     */
    public function reply(Request $request, Inquiry $inquiry)
    {
        $this->authorize('view', $inquiry);

        $validated = $request->validate([
            'content' => 'required|string',
        ]);

        Message::create([
            'inquiry_id' => $inquiry->id,
            'sender_id' => auth()->id(),
            'content' => $validated['content'],
        ]);

        // Update inquiry status
        if ($inquiry->status === 'pending') {
            $inquiry->update(['status' => 'replied']);
        }

        return back()->with('success', 'Reply sent successfully!');
    }
}
