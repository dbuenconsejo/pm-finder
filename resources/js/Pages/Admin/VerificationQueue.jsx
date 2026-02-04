import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function VerificationQueue({ pendingManagers }) {
    const handleVerify = (id) => {
        router.post(route('admin.verify', id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-[var(--text-primary)]">Verification Queue</h2>}
        >
            <Head title="Verification Queue" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="card">
                        <div className="divide-y divide-[var(--border-color)]">
                            {pendingManagers.data.length > 0 ? (
                                pendingManagers.data.map((pm) => (
                                    <div key={pm.id} className="flex items-center justify-between px-6 py-4 hover:bg-[var(--layer-02)] transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center border-2 border-amber-400">
                                                <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                                                    {pm.business_name?.[0] || pm.user?.name?.[0] || 'P'}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-[var(--text-primary)]">
                                                    {pm.business_name || pm.user?.name}
                                                </h3>
                                                <p className="text-sm text-[var(--text-secondary)]">{pm.user?.email}</p>
                                                <p className="text-sm text-[var(--text-muted)]">
                                                    {pm.city}, {pm.province}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Link
                                                href={route('property-managers.show', pm.id)}
                                                className="btn-secondary text-sm"
                                            >
                                                View Profile
                                            </Link>
                                            <button
                                                onClick={() => handleVerify(pm.id)}
                                                className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-500 transition-colors"
                                            >
                                                ✓ Verify
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-12 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--layer-02)] flex items-center justify-center">
                                        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-[var(--text-muted)]">No pending verifications. All caught up!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    {pendingManagers.links && pendingManagers.links.length > 3 && (
                        <div className="mt-6 flex justify-center">
                            <nav className="flex space-x-2">
                                {pendingManagers.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-amber-500 text-black'
                                                : 'bg-[var(--layer-01)] text-[var(--text-secondary)] hover:bg-[var(--layer-02)] border border-[var(--border-color)]'
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
