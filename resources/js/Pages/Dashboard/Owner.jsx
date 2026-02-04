import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { MessageSquare, MessageCircle, Bookmark, Wifi, Search, ArrowRight, CheckCircle, Star, MapPin } from 'lucide-react';

export default function OwnerDashboard({ stats, recentActivity, savedPropertyManagers }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground">
                            Welcome back!
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Manage your property manager searches and inquiries
                        </p>
                    </div>
                    <Link href={route('search')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:ring-2 hover:ring-primary/30 transition-all duration-300">
                        <Search className="w-4 h-4" style={{ color: '#ffffff' }} />
                        <span style={{ color: '#ffffff' }}>Find Property Managers</span>
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8 relative">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-500/15 to-pink-500/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-tl from-cyan-500/10 to-primary/5 rounded-full blur-3xl" />
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Stats Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <span className="stat-label">Sent Inquiries</span>
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="stat-value">{stats.sentInquiries}</div>
                            <div className="stat-change">Total sent</div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <span className="stat-label">Active Chats</span>
                                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="stat-value">{stats.activeChats}</div>
                            <div className="stat-change">Ongoing conversations</div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <span className="stat-label">Saved PMs</span>
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                                    <Bookmark className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="stat-value">{stats.savedPMs}</div>
                            <div className="stat-change">Bookmarked</div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <span className="stat-label">Online PMs</span>
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <Wifi className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="stat-value">{stats.onlinePMs}</div>
                            <div className="stat-change">{stats.totalPMs} total verified</div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="mb-8 rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-border flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                            <Link href={route('inquiries.index')} className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 font-medium">
                                View all <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="divide-y divide-border">
                            {recentActivity.length > 0 ? (
                                recentActivity.map((activity) => (
                                    <Link 
                                        key={activity.id} 
                                        href={route('inquiries.show', activity.id)}
                                        className="flex items-center justify-between px-5 py-4 hover:bg-accent/50 transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 border-2 border-primary/30 flex items-center justify-center shadow-md">
                                                    <span className="text-sm font-bold text-primary">
                                                        {activity.property_manager?.business_name?.[0] || 'P'}
                                                    </span>
                                                </div>
                                                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${
                                                    activity.property_manager?.is_online ? 'bg-emerald-500' : 'bg-muted-foreground/50'
                                                }`} title={activity.property_manager?.is_online ? 'Online' : 'Offline'} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    {activity.subject}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    To: {activity.property_manager?.business_name || activity.property_manager?.user?.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span 
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                                                    activity.status === 'replied' ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-800' :
                                                    activity.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-800' :
                                                    'bg-primary/10 border-primary/20'
                                                }`}
                                                style={{ 
                                                    color: activity.status === 'replied' ? '#047857' : 
                                                           activity.status === 'pending' ? '#b45309' : 
                                                           'inherit' 
                                                }}
                                            >
                                                {activity.status}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="px-6 py-12 text-center">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground mb-4">No recent activity</p>
                                    <Link href={route('search')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:ring-2 hover:ring-primary/30 transition-all duration-300">
                                        Find a Property Manager
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Saved Property Managers */}
                    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-border flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">Saved Property Managers</h3>
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {savedPropertyManagers.length > 0 ? (
                                    savedPropertyManagers.map((pm) => (
                                        <Link
                                            key={pm.id}
                                            href={route('property-managers.show', pm.id)}
                                            className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/30"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <div className="relative p-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center shrink-0 ring-2 ring-primary/30 group-hover:ring-primary/50 transition-all duration-300 shadow-md">
                                                        <span className="text-xl font-bold text-primary">
                                                            {pm.business_name?.[0] || pm.user?.name?.[0] || 'P'}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                                            {pm.business_name || pm.user?.name}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <div className="flex items-center gap-1">
                                                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                                <span className="text-sm font-mono text-muted-foreground">
                                                                    {Number(pm.rating).toFixed(1) || '0.0'}
                                                                </span>
                                                            </div>
                                                            {pm.is_verified && (
                                                                <div className="flex items-center gap-1 text-emerald-500">
                                                                    <CheckCircle className="w-4 h-4" />
                                                                    <span className="text-xs font-medium">Verified</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                {pm.city && (
                                                    <p className="mt-3 text-sm text-muted-foreground flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {pm.city}, {pm.province}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-8">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                            <Bookmark className="w-6 h-6" />
                                        </div>
                                        <p className="text-muted-foreground mb-4">No saved property managers yet</p>
                                        <Link href={route('search')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-border bg-card text-foreground font-semibold hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300">
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
