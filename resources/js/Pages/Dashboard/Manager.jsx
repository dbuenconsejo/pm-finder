import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

// Icons
const InquiryIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const EyeIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const ReviewIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);

const StarIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const EditIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const ExternalLinkIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

export default function ManagerDashboard({ propertyManager, stats, recentInquiries, recentReviews }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                            {propertyManager.business_name || 'Property Manager Dashboard'}
                        </h2>
                        <p className="text-sm text-[var(--text-tertiary)] mt-1">
                            Manage your inquiries and track your performance
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('property-managers.show', propertyManager.id)} className="btn-secondary">
                            <ExternalLinkIcon />
                            View Profile
                        </Link>
                        <Link href={route('property-managers.edit', propertyManager.id)} className="btn-primary">
                            <EditIcon />
                            Edit Profile
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Manager Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <span className="stat-label">New Inquiries</span>
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <InquiryIcon />
                                </div>
                            </div>
                            <div className="stat-value">{stats.newInquiries}</div>
                            <div className="stat-change">
                                <span className="text-[var(--text-tertiary)]">Awaiting response</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <span className="stat-label">Profile Views</span>
                                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                                    <EyeIcon />
                                </div>
                            </div>
                            <div className="stat-value font-mono">{stats.profileViews}</div>
                            <div className="stat-change positive">
                                <span className="text-[var(--text-tertiary)]">Total views</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <span className="stat-label">Total Reviews</span>
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                                    <ReviewIcon />
                                </div>
                            </div>
                            <div className="stat-value">{stats.totalReviews}</div>
                            <div className="stat-change">
                                <span className="text-[var(--text-tertiary)]">From clients</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <span className="stat-label">Rating</span>
                                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <StarIcon />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="stat-value">{Number(stats.rating).toFixed(1) || '0.0'}</span>
                                <span className="text-amber-500">★</span>
                            </div>
                            <div className="stat-change">
                                <span className="text-[var(--text-tertiary)]">Average rating</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* New Inquiries */}
                        <div className="card">
                            <div className="card-header flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-[var(--text-primary)]">New Inquiries</h3>
                                <Link href={route('inquiries.index')} className="text-sm text-amber-500 hover:text-amber-400 flex items-center gap-1">
                                    View all <ArrowRightIcon />
                                </Link>
                            </div>
                            <div className="divide-y divide-[var(--layer-3)]">
                                {recentInquiries.length > 0 ? (
                                    recentInquiries.map((inquiry) => (
                                        <Link
                                            key={inquiry.id}
                                            href={route('inquiries.show', inquiry.id)}
                                            className="block px-6 py-4 hover:bg-[var(--layer-2)] transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-semibold">
                                                        {inquiry.user?.name?.[0] || 'U'}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-[var(--text-primary)]">{inquiry.subject}</p>
                                                        <p className="text-sm text-[var(--text-tertiary)]">From: {inquiry.user?.name}</p>
                                                    </div>
                                                </div>
                                                <span className={`badge ${
                                                    inquiry.status === 'pending' ? 'badge-warning' :
                                                    inquiry.status === 'replied' ? 'badge-success' :
                                                    'badge-info'
                                                }`}>
                                                    {inquiry.status}
                                                </span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="px-6 py-12 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--layer-2)] flex items-center justify-center text-[var(--text-tertiary)]">
                                            <InquiryIcon />
                                        </div>
                                        <p className="text-[var(--text-tertiary)]">No new inquiries yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Reviews */}
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-lg font-semibold text-[var(--text-primary)]">Recent Reviews</h3>
                            </div>
                            <div className="divide-y divide-[var(--layer-3)]">
                                {recentReviews.length > 0 ? (
                                    recentReviews.map((review) => (
                                        <div key={review.id} className="px-6 py-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg 
                                                            key={i} 
                                                            className={`w-4 h-4 ${i < review.rating ? 'text-amber-500' : 'text-[var(--layer-3)]'}`} 
                                                            fill="currentColor" 
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="text-xs font-mono text-[var(--text-tertiary)]">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-[var(--text-secondary)]">
                                                {review.comment || 'No comment provided'}
                                            </p>
                                            <p className="mt-2 text-xs text-[var(--text-tertiary)]">
                                                — {review.user?.name}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-12 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--layer-2)] flex items-center justify-center text-[var(--text-tertiary)]">
                                            <ReviewIcon />
                                        </div>
                                        <p className="text-[var(--text-tertiary)]">No reviews yet</p>
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
