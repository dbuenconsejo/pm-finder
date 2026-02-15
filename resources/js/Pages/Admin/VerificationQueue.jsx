import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Eye, UserCheck, FileText, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

export default function VerificationQueue({ pendingManagers }) {
    const handleVerify = (id) => {
        router.post(route('admin.verify', id));
    };

    const statusConfig = {
        unsubmitted: { label: 'Not Submitted', color: 'text-muted-foreground bg-muted', icon: AlertCircle },
        pending: { label: 'Pending Review', color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10', icon: Clock },
        approved: { label: 'Approved', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10', icon: ShieldCheck },
        rejected: { label: 'Rejected', color: 'text-red-600 bg-red-50 dark:bg-red-500/10', icon: AlertCircle },
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
                                pendingManagers.data.map((pm) => {
                                    const status = statusConfig[pm.verification_status] || statusConfig.unsubmitted;
                                    const docCount = pm.verification_documents?.length || 0;
                                    const pendingDocCount = pm.verification_documents?.filter(d => d.status === 'pending').length || 0;

                                    return (
                                        <div key={pm.id} className="flex items-center justify-between px-6 py-4 hover:bg-accent/50 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary/30 flex-shrink-0">
                                                    {pm.avatar_url ? (
                                                        <img src={pm.avatar_url} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                                                            <span className="text-lg font-bold text-primary">
                                                                {pm.business_name?.[0] || pm.user?.name?.[0] || 'P'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-foreground">
                                                        {pm.business_name || pm.user?.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">{pm.user?.email}</p>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <p className="text-sm text-muted-foreground">
                                                            {pm.city}{pm.city && pm.province ? ', ' : ''}{pm.province}
                                                        </p>
                                                        {docCount > 0 && (
                                                            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                                                <FileText className="w-3 h-3" />
                                                                {docCount} doc{docCount !== 1 ? 's' : ''}
                                                                {pendingDocCount > 0 && (
                                                                    <span className="text-amber-600 font-medium">({pendingDocCount} pending)</span>
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                {/* Status Badge */}
                                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                                    <status.icon className="w-3 h-3" />
                                                    {status.label}
                                                </div>

                                                {/* Review Button (for PMs with documents) */}
                                                {docCount > 0 ? (
                                                    <Link
                                                        href={route('admin.verification-review', pm.id)}
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:ring-2 hover:ring-amber-500/30 transition-all duration-200"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                        Review Docs
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        href={route('property-managers.show', pm.id)}
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-foreground text-sm font-medium hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        View Profile
                                                    </Link>
                                                )}

                                                {/* Quick Verify (no documents required) */}
                                                <button
                                                    onClick={() => handleVerify(pm.id)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:ring-2 hover:ring-emerald-500/30 transition-all duration-200"
                                                >
                                                    <UserCheck className="w-4 h-4" style={{ color: '#ffffff' }} />
                                                    <span style={{ color: '#ffffff' }}>Verify</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
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
