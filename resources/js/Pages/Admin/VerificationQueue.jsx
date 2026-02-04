import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Eye, UserCheck } from 'lucide-react';

export default function VerificationQueue({ pendingManagers }) {
    const handleVerify = (id) => {
        router.post(route('admin.verify', id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('dashboard')}
                        className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-accent/80 transition-all duration-200"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">Verification Queue</h2>
                        <p className="text-sm text-muted-foreground mt-1">Review and approve property manager applications</p>
                    </div>
                </div>
            }
        >
            <Head title="Verification Queue" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-border bg-card overflow-hidden">
                        <div className="divide-y divide-border">
                            {pendingManagers.data.length > 0 ? (
                                pendingManagers.data.map((pm) => (
                                    <div key={pm.id} className="flex items-center justify-between px-6 py-4 hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center border-2 border-primary/30">
                                                <span className="text-lg font-bold text-primary">
                                                    {pm.business_name?.[0] || pm.user?.name?.[0] || 'P'}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-foreground">
                                                    {pm.business_name || pm.user?.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">{pm.user?.email}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {pm.city}, {pm.province}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Link
                                                href={route('property-managers.show', pm.id)}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-foreground text-sm font-medium hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200"
                                            >
                                                <Eye className="w-4 h-4" />
                                                View Profile
                                            </Link>
                                            <button
                                                onClick={() => handleVerify(pm.id)}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:ring-2 hover:ring-emerald-500/30 transition-all duration-200"
                                            >
                                                <UserCheck className="w-4 h-4" style={{ color: '#ffffff' }} />
                                                <span style={{ color: '#ffffff' }}>Verify</span>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-16 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
                                    <p className="text-muted-foreground">No pending verifications at the moment.</p>
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
                                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            link.active
                                                ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md'
                                                : 'bg-card text-muted-foreground hover:bg-accent hover:text-primary border border-border hover:border-primary/30'
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
