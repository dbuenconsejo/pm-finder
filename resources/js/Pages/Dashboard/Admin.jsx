import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, Building2, CheckCircle, Clock, MessageSquare, Shield, UserCheck } from 'lucide-react';

export default function AdminDashboard({ stats, recentUsers, pendingManagers }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <Shield className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">Admin Dashboard</h2>
                        <p className="text-sm text-muted-foreground">System overview and management</p>
                    </div>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Quick Stats */}
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        <div className="overflow-hidden rounded-2xl bg-card border border-border p-6 hover:border-purple-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-purple-500/10">
                                    <Users className="w-5 h-5 text-purple-400" />
                                </div>
                                <div className="text-sm font-medium text-muted-foreground">Total Users</div>
                            </div>
                            <div className="text-3xl font-bold text-foreground">{stats.totalUsers}</div>
                        </div>
                        <div className="overflow-hidden rounded-2xl bg-card border border-border p-6 hover:border-blue-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-blue-500/10">
                                    <Building2 className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="text-sm font-medium text-muted-foreground">Total Managers</div>
                            </div>
                            <div className="text-3xl font-bold text-foreground">{stats.totalManagers}</div>
                        </div>
                        <div className="overflow-hidden rounded-2xl bg-card border border-border p-6 hover:border-emerald-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-emerald-500/10">
                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div className="text-sm font-medium text-muted-foreground">Verified</div>
                            </div>
                            <div className="text-3xl font-bold text-emerald-500">{stats.verifiedManagers}</div>
                        </div>
                        <div className="overflow-hidden rounded-2xl bg-card border border-border p-6 hover:border-amber-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-amber-500/10">
                                    <Clock className="w-5 h-5 text-amber-400" />
                                </div>
                                <div className="text-sm font-medium text-muted-foreground">Pending</div>
                            </div>
                            <div className="text-3xl font-bold text-amber-500">{stats.pendingVerification}</div>
                        </div>
                        <div className="overflow-hidden rounded-2xl bg-card border border-border p-6 hover:border-cyan-500/30 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-cyan-500/10">
                                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div className="text-sm font-medium text-muted-foreground">Total Inquiries</div>
                            </div>
                            <div className="text-3xl font-bold text-foreground">{stats.totalInquiries}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Pending Verification */}
                        <div className="overflow-hidden rounded-2xl bg-card border border-border">
                            <div className="flex items-center justify-between border-b border-border px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-amber-400" />
                                    <h3 className="text-lg font-semibold text-foreground">Pending Verification</h3>
                                </div>
                                <Link href={route('admin.verification-queue')} className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                                    View all →
                                </Link>
                            </div>
                            <div className="divide-y divide-border">
                                {pendingManagers.length > 0 ? (
                                    pendingManagers.map((pm) => (
                                        <div key={pm.id} className="flex items-center justify-between px-6 py-4 hover:bg-accent/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                                                    <span className="text-sm font-bold text-amber-500">
                                                        {(pm.business_name || pm.user?.name)?.[0]?.toUpperCase() || 'P'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-foreground">{pm.business_name || pm.user?.name}</p>
                                                    <p className="text-sm text-muted-foreground">{pm.city}, {pm.province}</p>
                                                </div>
                                            </div>
                                            <Link
                                                href={route('admin.verify', pm.id)}
                                                method="post"
                                                as="button"
                                                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl transition-all"
                                            >
                                                <UserCheck className="w-4 h-4" />
                                                Verify
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-8 text-center">
                                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6 text-emerald-500" />
                                        </div>
                                        <p className="text-sm text-muted-foreground">No pending verifications.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Users */}
                        <div className="overflow-hidden rounded-2xl bg-card border border-border">
                            <div className="flex items-center justify-between border-b border-border px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-purple-400" />
                                    <h3 className="text-lg font-semibold text-foreground">Recent Users</h3>
                                </div>
                                <Link href={route('admin.users.index')} className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                                    Manage users →
                                </Link>
                            </div>
                            <div className="divide-y divide-border">
                                {recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between px-6 py-4 hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                                                <span className="text-sm font-bold text-primary">
                                                    {user.name?.[0]?.toUpperCase() || 'U'}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{user.name}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                            user.role === 'admin' 
                                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                                                : user.role === 'manager' 
                                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                                                : 'bg-muted text-muted-foreground border border-border'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href={route('admin.users.index')}
                            className="inline-flex items-center gap-2 rounded-xl bg-card border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-purple-500/30 hover:bg-purple-500/5 transition-all"
                        >
                            <Users className="w-4 h-4" />
                            Manage Users
                        </Link>
                        <Link
                            href={route('admin.verification-queue')}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-xl transition-all"
                        >
                            <Clock className="w-4 h-4" />
                            Verification Queue
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
