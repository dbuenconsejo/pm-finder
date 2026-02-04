import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function PropertyManagersIndex({ propertyManagers }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-[var(--text-primary)]">Property Managers</h2>}
        >
            <Head title="Property Managers" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {propertyManagers.data.map((pm) => (
                            <Link
                                key={pm.id}
                                href={route('property-managers.show', pm.id)}
                                className="card group hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center border-2 border-amber-300 dark:border-amber-600 group-hover:border-amber-400 transition-colors">
                                            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                                                {pm.business_name?.[0] || pm.user?.name?.[0] || 'P'}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-[var(--text-primary)] truncate group-hover:text-amber-500 transition-colors">
                                                {pm.business_name || pm.user?.name}
                                            </h3>
                                            <div className="flex items-center text-sm mt-1">
                                                <span className="text-amber-500">★</span>
                                                <span className="ml-1 text-[var(--text-secondary)] font-mono">{pm.rating || '0.0'}</span>
                                                <span className="ml-1 text-[var(--text-muted)]">({pm.review_count} reviews)</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                {pm.is_verified && (
                                                    <span className="badge-success text-xs">
                                                        ✓ Verified
                                                    </span>
                                                )}
                                                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                                                    pm.is_online 
                                                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${pm.is_online ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
                                                    {pm.is_online ? 'Online' : 'Offline'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-sm text-[var(--text-muted)]">
                                        📍 {pm.city || pm.province || 'Philippines'}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {propertyManagers.data.length === 0 && (
                        <div className="card text-center py-12">
                            <div className="text-4xl mb-4">🏠</div>
                            <p className="text-[var(--text-muted)]">No property managers available yet.</p>
                            <Link
                                href={route('search')}
                                className="btn-primary inline-block mt-4"
                            >
                                Search Property Managers
                            </Link>
                        </div>
                    )}

                    {/* Pagination */}
                    {propertyManagers.links && propertyManagers.links.length > 3 && (
                        <div className="mt-8 flex justify-center space-x-2">
                            {propertyManagers.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        link.active
                                            ? 'bg-amber-500 text-dark-layer-01'
                                            : link.url
                                                ? 'bg-[var(--layer-02)] text-[var(--text-secondary)] hover:bg-amber-100 dark:hover:bg-amber-900/50 hover:text-amber-600 border border-[var(--border-color)]'
                                                : 'bg-[var(--layer-02)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-color)]'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    preserveState
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
