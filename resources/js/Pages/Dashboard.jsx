import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Search, Star, MapPin, Building2, MessageSquare, Heart, TrendingUp, Users, CheckCircle } from 'lucide-react';

export default function Dashboard({ auth, stats = {}, recentManagers = [], savedManagers = [] }) {
    const quickStats = [
        { 
            label: 'Property Managers', 
            value: stats.totalManagers || '500+', 
            icon: Users, 
            trend: '+12%',
            color: 'from-purple-500 to-violet-600'
        },
        { 
            label: 'Saved Managers', 
            value: stats.savedCount || 0, 
            icon: Heart, 
            trend: null,
            color: 'from-pink-500 to-rose-600'
        },
        { 
            label: 'Messages', 
            value: stats.messageCount || 0, 
            icon: MessageSquare, 
            trend: null,
            color: 'from-blue-500 to-cyan-600'
        },
        { 
            label: 'Inquiries', 
            value: stats.inquiryCount || 0, 
            icon: TrendingUp, 
            trend: null,
            color: 'from-emerald-500 to-teal-600'
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">
                            Welcome back, {auth?.user?.name?.split(' ')[0] || 'User'}! 👋
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">Here's what's happening with your property search</p>
                    </div>
                    <Link
                        href={route('search')}
                        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:ring-2 hover:ring-primary/30 transition-all duration-300"
                    >
                        <Search className="w-4 h-4" />
                        Find Managers
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
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {quickStats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <div className="flex items-center justify-between">
                                    <span className="stat-label">{stat.label}</span>
                                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-change">
                                    {stat.trend ? (
                                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" />
                                            {stat.trend} this month
                                        </span>
                                    ) : (
                                        <span>Total count</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Featured Property Managers */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                    Featured Property Managers
                                </h3>
                                <Link href={route('property-managers.index')} className="text-sm text-primary hover:text-primary/80 font-medium transition-colors hover:underline underline-offset-4">
                                    View all →
                                </Link>
                            </div>
                            
                            <div className="grid sm:grid-cols-2 gap-4">
                                {(recentManagers.length > 0 ? recentManagers : [
                                    { id: 1, business_name: 'Premier Property Co.', city: 'Manila', rating: '4.9', review_count: 127, is_verified: true, is_online: true },
                                    { id: 2, business_name: 'Urban Living Management', city: 'Makati', rating: '4.8', review_count: 89, is_verified: true, is_online: false },
                                    { id: 3, business_name: 'Metro Estates', city: 'BGC', rating: '4.7', review_count: 64, is_verified: true, is_online: true },
                                    { id: 4, business_name: 'Sunrise Properties', city: 'Quezon City', rating: '4.6', review_count: 52, is_verified: false, is_online: false },
                                ]).slice(0, 4).map((pm, index) => (
                                    <Link
                                        key={pm.id || index}
                                        href={route('property-managers.show', pm.id || 1)}
                                        className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="p-5">
                                            <div className="flex items-start gap-4">
                                                {/* Avatar with gradient background */}
                                                <div className="relative">
                                                    <div className="absolute -inset-1 bg-gradient-to-br from-primary to-purple-600 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                                                    <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-primary to-purple-600 border-2 border-primary/30 group-hover:border-primary/50 flex items-center justify-center transition-all duration-300 shadow-lg">
                                                        <span className="text-xl font-bold text-white">
                                                            {pm.business_name?.[0] || 'P'}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                                            {pm.business_name}
                                                        </h4>
                                                        {pm.is_verified && (
                                                            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                                        )}
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-3 mt-1.5">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                            <span className="text-sm font-medium text-foreground">{pm.rating}</span>
                                                            <span className="text-xs text-muted-foreground">({pm.review_count})</span>
                                                        </div>
                                                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                                                            pm.is_online 
                                                                ? 'text-emerald-600 dark:text-emerald-400' 
                                                                : 'text-muted-foreground'
                                                        }`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${pm.is_online ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground/50'}`} />
                                                            {pm.is_online ? 'Online' : 'Offline'}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                                                        <MapPin className="w-3.5 h-3.5" />
                                                        <span>{pm.city || 'Philippines'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions Card */}
                            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                    Quick Actions
                                </h3>
                                <div className="space-y-3">
                                    <Link
                                        href={route('search')}
                                        className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
                                    >
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 text-primary group-hover:from-primary group-hover:to-purple-600 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/25">
                                            <Search className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">Search Managers</p>
                                            <p className="text-xs text-muted-foreground">Find the perfect match</p>
                                        </div>
                                    </Link>
                                    
                                    <Link
                                        href={route('messages.index')}
                                        className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200 group"
                                    >
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 text-blue-500 group-hover:from-blue-500 group-hover:to-cyan-500 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                                            <MessageSquare className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground text-sm group-hover:text-blue-500 transition-colors">Messages</p>
                                            <p className="text-xs text-muted-foreground">Check your inbox</p>
                                        </div>
                                    </Link>
                                    
                                    <Link
                                        href={route('saved.index')}
                                        className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-pink-500/30 hover:bg-pink-500/5 transition-all duration-200 group"
                                    >
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/10 to-rose-500/10 text-pink-500 group-hover:from-pink-500 group-hover:to-rose-500 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-pink-500/25">
                                            <Heart className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground text-sm group-hover:text-pink-500 transition-colors">Saved Managers</p>
                                            <p className="text-xs text-muted-foreground">View your favorites</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Pro Tip Card */}
                            <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 p-5">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
                                <div className="relative">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-lg">💡</span>
                                        <h4 className="font-semibold text-foreground">Pro Tip</h4>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Save multiple property managers to compare their services, ratings, and reviews before making your decision.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
