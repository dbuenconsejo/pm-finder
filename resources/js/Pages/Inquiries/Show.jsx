import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/Components/Toast';

export default function InquiryShow({ inquiry: initialInquiry }) {
    const { auth } = usePage().props;
    const { addToast } = useToast();
    const [messages, setMessages] = useState(initialInquiry.messages || []);
    const [isPolling, setIsPolling] = useState(true);
    const messagesEndRef = useRef(null);
    const lastMessageIdRef = useRef(messages.length > 0 ? Math.max(...messages.map(m => m.id)) : 0);

    const { data, setData, post, processing, reset } = useForm({
        content: '',
    });

    const isOwner = initialInquiry.user_id === auth.user.id;
    const otherParty = isOwner
        ? initialInquiry.property_manager?.business_name || initialInquiry.property_manager?.user?.name
        : initialInquiry.user?.name;

    // Scroll to bottom when messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Poll for new messages
    useEffect(() => {
        if (!isPolling) return;

        const pollMessages = async () => {
            try {
                const response = await fetch(
                    route('inquiries.messages', initialInquiry.id) + `?last_message_id=${lastMessageIdRef.current}`,
                    {
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        credentials: 'same-origin',
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    if (data.messages && data.messages.length > 0) {
                        // Check for new messages from others
                        const newFromOthers = data.messages.filter(m => m.sender_id !== auth.user.id);
                        if (newFromOthers.length > 0) {
                            const lastNew = newFromOthers[newFromOthers.length - 1];
                            addToast(lastNew.content, 'message', lastNew.sender?.name);
                        }

                        setMessages(prev => {
                            const existingIds = new Set(prev.map(m => m.id));
                            const uniqueNew = data.messages.filter(m => !existingIds.has(m.id));
                            return [...prev, ...uniqueNew];
                        });
                        lastMessageIdRef.current = Math.max(...data.messages.map(m => m.id));
                    }
                }
            } catch (error) {
                console.error('Failed to poll messages:', error);
            }
        };

        const interval = setInterval(pollMessages, 3000);
        return () => clearInterval(interval);
    }, [isPolling, initialInquiry.id, auth.user.id, addToast]);

    const handleReply = (e) => {
        e.preventDefault();
        
        // Optimistic update
        const tempMessage = {
            id: Date.now(),
            sender_id: auth.user.id,
            sender: { name: auth.user.name },
            content: data.content,
            created_at: new Date().toISOString(),
            is_read: true,
            _temp: true,
        };
        
        setMessages(prev => [...prev, tempMessage]);
        const sentContent = data.content;
        reset();

        // Actually send
        post(route('inquiries.reply', initialInquiry.id), {
            preserveScroll: true,
            onSuccess: () => {
                // Remove temp message - the poll will pick up the real one
                setMessages(prev => prev.filter(m => !m._temp));
            },
            onError: () => {
                // Remove temp message on error
                setMessages(prev => prev.filter(m => !m._temp));
                setData('content', sentContent);
                addToast('Failed to send message', 'info');
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-[var(--text-primary)]">
                        {initialInquiry.subject}
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isPolling ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                        <span className="text-xs text-[var(--text-muted)]">
                            {isPolling ? 'Live' : 'Paused'}
                        </span>
                    </div>
                </div>
            }
        >
            <Head title={initialInquiry.subject} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    {/* Inquiry Details */}
                    <div className="mb-6 card">
                        <div className="border-b border-[var(--border-color)] bg-[var(--layer-02)] px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        {isOwner ? 'To:' : 'From:'} <span className="font-medium text-[var(--text-primary)]">{otherParty}</span>
                                    </p>
                                    {initialInquiry.property_type && (
                                        <p className="text-sm text-[var(--text-muted)]">
                                            Property: {initialInquiry.property_type} in {initialInquiry.property_location}
                                        </p>
                                    )}
                                </div>
                                <span className={`badge ${
                                    initialInquiry.status === 'pending' ? 'badge-warning' :
                                    initialInquiry.status === 'replied' ? 'badge-success' :
                                    initialInquiry.status === 'closed' ? 'bg-[var(--layer-3)] text-[var(--text-secondary)]' :
                                    'badge-info'
                                }`}>
                                    {initialInquiry.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="card">
                        <div className="p-6 max-h-[500px] overflow-y-auto space-y-4">
                            {messages.map((message) => {
                                const isMe = message.sender_id === auth.user.id;
                                return (
                                    <div
                                        key={message.id}
                                        className={`flex ${isMe ? 'justify-end' : 'justify-start'} ${message._temp ? 'opacity-60' : ''}`}
                                    >
                                        <div className={`flex items-end gap-2 max-w-[80%] ${isMe ? 'flex-row-reverse' : ''}`}>
                                            {/* Avatar */}
                                            <div className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                                isMe
                                                    ? 'bg-amber-500 text-black'
                                                    : 'bg-blue-500 text-white'
                                            }`}>
                                                {message.sender?.name?.[0] || '?'}
                                            </div>
                                            
                                            {/* Message bubble */}
                                            {isMe ? (
                                                /* My message - gold bubble with dark text */
                                                <div className="rounded-2xl px-4 py-3 rounded-br-md" style={{ backgroundColor: '#F5A623' }}>
                                                    <p className="whitespace-pre-wrap break-words" style={{ color: '#000000' }}>
                                                        {message.content}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1 text-xs justify-end" style={{ color: '#4a4a4a' }}>
                                                        <span>{new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        {message._temp && <span>Sending...</span>}
                                                        {!message._temp && (
                                                            <span>{message.is_read ? '✓✓' : '✓'}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                /* Other person's message - gray bubble with white text in dark mode */
                                                <div className="rounded-2xl px-4 py-3 rounded-bl-md" style={{ backgroundColor: 'var(--msg-bg, #f3f4f6)', border: '1px solid var(--msg-border, #e5e7eb)' }}>
                                                    <p className="text-xs font-semibold mb-1" style={{ color: '#3b82f6' }}>
                                                        {message.sender?.name}
                                                    </p>
                                                    <p className="whitespace-pre-wrap break-words" style={{ color: 'var(--msg-text, #111827)' }}>
                                                        {message.content}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: 'var(--msg-meta, #6b7280)' }}>
                                                        <span>{new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* New badge for unread */}
                                            {!isMe && !message.is_read && (
                                                <span className="shrink-0 w-2 h-2 rounded-full bg-amber-500" title="New message" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Reply Form */}
                        {initialInquiry.status !== 'closed' && (
                            <div className="border-t border-[var(--border-color)] p-6">
                                <form onSubmit={handleReply}>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Reply</label>
                                    <textarea
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        rows={4}
                                        className="input"
                                        placeholder="Type your reply..."
                                        required
                                    />
                                    <div className="mt-4 flex justify-between items-center">
                                        <button
                                            type="button"
                                            onClick={() => setIsPolling(!isPolling)}
                                            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                                        >
                                            {isPolling ? 'Pause live updates' : 'Resume live updates'}
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={processing || !data.content.trim()}
                                            className="btn-primary disabled:opacity-50"
                                        >
                                            {processing ? 'Sending...' : 'Send Reply'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
