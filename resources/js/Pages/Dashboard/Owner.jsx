import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

// Icons
const InquiryIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const ChatIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
    </svg>
);

const SavedIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const VerifiedIcon = () => (
    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const StarIcon = ({ filled }) => (
    <svg className={`w-4 h-4 ${filled ? 'text-amber-500' : 'text-[var(--layer-3)]'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export default function OwnerDashboard({ stats, recentActivity, savedPropertyManagers }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                            Welcome back!
                        </h2>
                        <p className="text-sm text-[var(--text-tertiary)] mt-1">
                            Manage your property manager searches and inquiries
                        </p>
                    </div>
                    <Link href={route('search')} className="btn-primary">
                        <SearchIcon />
                        Find Property Managers
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <span className="stat-label">Sent Inquiries</span>
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <InquiryIcon />
                                </div>
                            </div>
                            <div className="stat-value">{stats.sentInquiries}</div>
                            <div className="stat-change positive">
                                <span className="text-[var(--text-tertiary)]">Total sent</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <span className="stat-label">Active Chats</span>
                                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                                    <ChatIcon />
                                </div>
                            </div>
                            <div className="stat-value">{stats.activeChats}</div>
                            <div className="stat-change">
                                <span className="text-[var(--text-tertiary)]">Ongoing conversations</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <span className="stat-label">Saved PMs</span>
                                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <SavedIcon />
                                </div>
                            </div>
                            <div className="stat-value">{stats.savedPMs}</div>
                            <div className="stat-change">
                                <span className="text-[var(--text-tertiary)]">Bookmarked</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <span className="stat-label">Online PMs</span>
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="stat-value">{stats.onlinePMs}</div>
                            <div className="stat-change">
                                <span className="text-[var(--text-tertiary)]">{stats.totalPMs} total verified</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="mb-8 card">
                        <div className="card-header flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Recent Activity</h3>
                            <Link href={route('inquiries.index')} className="text-sm text-amber-500 hover:text-amber-400 flex items-center gap-1">
                                View all <ArrowRightIcon />
                            </Link>
                        </div>
                        <div className="divide-y divide-[var(--layer-3)]">
                            {recentActivity.length > 0 ? (
                                recentActivity.map((activity) => (
                                    <Link 
                                        key={activity.id} 
                                        href={route('inquiries.show', activity.id)}
                                        className="flex items-center justify-between px-6 py-4 hover:bg-[var(--layer-2)] transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-semibold">
                                                    {activity.property_manager?.business_name?.[0] || 'P'}
                                                </div>
                                                {/* Online status indicator */}
                                                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[var(--layer-1)] ${
                                                    activity.property_manager?.is_online ? 'bg-emerald-500' : 'bg-gray-400'
                                                }`} title={activity.property_manager?.is_online ? 'Online' : 'Offline'} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-[var(--text-primary)]">
                                                    {activity.subject}
                                                </p>
                                                <p className="text-sm text-[var(--text-tertiary)]">
                                                    To: {activity.property_manager?.business_name || activity.property_manager?.user?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`badge ${
                                                activity.status === 'replied' ? 'badge-success' :
                                                activity.status === 'pending' ? 'badge-warning' :
                                                'badge-info'
                                            }`}>
                                                {activity.status}
                                            </span>
                                            <ArrowRightIcon />
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="px-6 py-12 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--layer-2)] flex items-center justify-center">
                                        <InquiryIcon />
                                    </div>
                                    <p className="text-[var(--text-tertiary)] mb-4">No recent activity</p>
                                    <Link href={route('search')} className="btn-primary">
                                        Find a Property Manager
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Saved Property Managers */}
                    <div className="card">
                        <div className="card-header flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-[var(--text-primary)]">Saved Property Managers</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {savedPropertyManagers.length > 0 ? (
                                    savedPropertyManagers.map((pm) => (
                                        <Link
                                            key={pm.id}
                                            href={route('property-managers.show', pm.id)}
                                            className="block rounded-lg border border-[var(--layer-3)] p-4 hover:border-amber-500 transition-all hover:shadow-lg group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-semibold text-lg">
                                                    {pm.business_name?.[0] || pm.user?.name?.[0] || 'P'}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-[var(--text-primary)] truncate group-hover:text-amber-500 transition-colors">
                                                        {pm.business_name || pm.user?.name}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex items-center">
                                                            <StarIcon filled={true} />
                                                            <span className="ml-1 text-sm font-mono text-[var(--text-secondary)]">
                                                                {Number(pm.rating).toFixed(1) || '0.0'}
                                                            </span>
                                                        </div>
                                                        {pm.is_verified && (
                                                            <div className="flex items-center gap-1 text-green-500">
                                                                <VerifiedIcon />
                                                                <span className="text-xs">Verified</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {pm.city && (
                                                <p className="mt-3 text-xs text-[var(--text-tertiary)]">
                                                    📍 {pm.city}, {pm.province}
                                                </p>
                                            )}
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-8">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--layer-2)] flex items-center justify-center text-[var(--text-tertiary)]">
                                            <SavedIcon />
                                        </div>
                                        <p className="text-[var(--text-tertiary)] mb-4">No saved property managers yet</p>
                                        <Link href={route('search')} className="btn-secondary">
                                            Browse Property Managers
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
