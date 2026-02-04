import { useState, useEffect, useRef } from 'react';
import { Link, router } from '@inertiajs/react';

const BellIcon = ({ hasNotifications }) => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);

    const fetchNotifications = async () => {
        try {
            const response = await fetch(route('notifications.index'), {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
            });
            
            if (response.ok) {
                const data = await response.json();
                setUnreadCount(data.unread_count);
                setNotifications(data.notifications);
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        
        // Poll for new notifications every 10 seconds
        const interval = setInterval(fetchNotifications, 10000);
        
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMarkAllRead = async () => {
        setLoading(true);
        try {
            await fetch(route('notifications.mark-read'), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                },
                credentials: 'same-origin',
            });
            setUnreadCount(0);
            setNotifications([]);
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
        setLoading(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
            >
                <BellIcon />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-card border border-border shadow-xl z-50 backdrop-blur-sm">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50 rounded-t-xl">
                        <h3 className="font-semibold text-foreground">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                disabled={loading}
                                className="text-xs text-primary hover:text-primary/80 disabled:opacity-50"
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <Link
                                    key={notification.id}
                                    href={route('inquiries.show', notification.inquiry_id)}
                                    className="block px-4 py-3 hover:bg-accent/50 transition-colors border-b border-border last:border-0"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                            <span className="text-sm font-bold text-primary">
                                                {notification.sender_name[0]}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-foreground truncate">
                                                {notification.sender_name}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                Re: {notification.subject}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {notification.preview}
                                            </p>
                                            <p className="text-xs text-primary mt-1">
                                                {notification.created_at}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="px-4 py-8 text-center">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                    <BellIcon />
                                </div>
                                <p className="text-sm text-muted-foreground">No new notifications</p>
                            </div>
                        )}
                    </div>

                    <div className="px-4 py-3 border-t border-border bg-muted/30 rounded-b-xl">
                        <Link
                            href={route('inquiries.index')}
                            className="block text-center text-sm text-primary hover:text-primary/80 font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            View all inquiries
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
