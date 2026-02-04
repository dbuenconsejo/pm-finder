import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function InquiriesIndex({ inquiries }) {
    const { auth } = usePage().props;
    const isManager = auth.user?.role === 'manager';

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-[foreground]">Inquiries</h2>}
        >
            <Head title="Inquiries" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="card">
                        <div className="divide-y divide-[border]">
                            {inquiries.data.length > 0 ? (
                                inquiries.data.map((inquiry) => (
                                    <Link
                                        key={inquiry.id}
                                        href={route('inquiries.show', inquiry.id)}
                                        className="block px-6 py-4 hover:bg-[var(--layer-02)] transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                {/* Avatar with online status */}
                                                <div className="relative">
                                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                                                        {isManager 
                                                            ? (inquiry.user?.name?.[0] || 'U')
                                                            : (inquiry.property_manager?.business_name?.[0] || inquiry.property_manager?.user?.name?.[0] || 'P')
                                                        }
                                                    </div>
                                                    {/* Online status indicator */}
                                                    <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[var(--layer-01)] ${
                                                        isManager
                                                            ? (inquiry.user?.is_online ? 'bg-emerald-500' : 'bg-gray-400')
                                                            : (inquiry.property_manager?.is_online ? 'bg-emerald-500' : 'bg-gray-400')
                                                    }`} title={
                                                        isManager
                                                            ? (inquiry.user?.is_online ? 'Online' : 'Offline')
                                                            : (inquiry.property_manager?.is_online ? 'Online' : 'Offline')
                                                    } />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-[foreground]">{inquiry.subject}</h3>
                                                    <p className="text-sm text-[muted-foreground]">
                                                        {isManager ? (
                                                            <>From: {inquiry.user?.name}</>
                                                        ) : (
                                                            <>To: {inquiry.property_manager?.user?.name || inquiry.property_manager?.business_name}</>
                                                        )}
                                                    </p>
                                                    {inquiry.property_type && (
                                                        <p className="text-sm text-[var(--text-muted)]">
                                                            Property: {inquiry.property_type} in {inquiry.property_location}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className={`badge ${
                                                    inquiry.status === 'pending' ? 'badge-warning' :
                                                    inquiry.status === 'replied' ? 'badge-success' :
                                                    inquiry.status === 'closed' ? 'bg-[border] text-[muted-foreground]' :
                                                    'badge-info'
                                                }`}>
                                                    {inquiry.status}
                                                </span>
                                                <span className="text-sm text-[var(--text-muted)]">
                                                    {new Date(inquiry.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="px-6 py-12 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--layer-02)] flex items-center justify-center">
                                        <svg className="w-8 h-8 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    {isManager ? (
                                        <p className="text-[var(--text-muted)]">No inquiries received yet. Make sure your profile is complete and visible.</p>
                                    ) : (
                                        <p className="text-[var(--text-muted)]">
                                            No inquiries sent yet.{' '}
                                            <Link href={route('search')} className="text-primary hover:underline">
                                                Find a property manager
                                            </Link>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    {inquiries.links && inquiries.links.length > 3 && (
                        <div className="mt-6 flex justify-center">
                            <nav className="flex space-x-2">
                                {inquiries.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-primary text-black'
                                                : 'bg-[var(--layer-01)] text-[muted-foreground] hover:bg-[var(--layer-02)] border border-[border]'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
