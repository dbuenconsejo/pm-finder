import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Star, MapPin, CheckCircle, Search, Filter, Grid3X3, List } from 'lucide-react';
import { useState } from 'react';

export default function PropertyManagersIndex({ propertyManagers }) {
    const [viewMode, setViewMode] = useState('grid');
    
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">Property Managers</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {propertyManagers.total || propertyManagers.data.length} professionals ready to help
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* View Toggle */}
                        <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl border border-border/50 bg-card/50">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                    viewMode === 'grid' 
                                        ? 'bg-primary text-white shadow-sm' 
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                }`}
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                    viewMode === 'list' 
                                        ? 'bg-primary text-white shadow-sm' 
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                }`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                        <Link
                            href={route('search')}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/50 text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                        >
                            <Filter className="w-4 h-4" />
                            <span className="hidden sm:inline">Filters</span>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Property Managers" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Property Manager Cards */}
                    <div className={`grid gap-5 ${
                        viewMode === 'grid' 
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                            : 'grid-cols-1'
                    }`}>
                        {propertyManagers.data.map((pm) => (
                            <Link
                                key={pm.id}
                                href={route('property-managers.show', pm.id)}
                                className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-transparent hover:bg-card/50 hover:border-primary/40 transition-all duration-300 ${
                                    viewMode === 'list' ? 'flex items-center' : ''
                                }`}
                            >
                                {/* Animated gradient border effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '1px', margin: '-1px' }} />
                                
                                <div className={`relative bg-card/80 backdrop-blur-sm rounded-2xl m-[1px] ${
                                    viewMode === 'list' ? 'p-4 flex items-center gap-5 w-full' : 'p-5'
                                }`}>
                                    <div className={`flex ${viewMode === 'list' ? 'items-center gap-5 flex-1' : 'items-start gap-4'}`}>
                                        {/* Avatar with gradient ring */}
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute -inset-1 bg-gradient-to-br from-primary to-purple-600 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
                                            <div className={`relative rounded-full border-2 border-primary/30 group-hover:border-primary/50 transition-all duration-300 shadow-md overflow-hidden ${
                                                viewMode === 'list' ? 'h-12 w-12' : 'h-16 w-16'
                                            }`}>
                                                {pm.avatar_url ? (
                                                    <img 
                                                        src={pm.avatar_url} 
                                                        alt={pm.business_name || pm.user?.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                                                        <span className={`font-bold text-white ${
                                                            viewMode === 'list' ? 'text-lg' : 'text-2xl'
                                                        }`}>
                                                            {pm.business_name?.[0] || pm.user?.name?.[0] || 'P'}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            {/* Online indicator */}
                                            {pm.is_online && (
                                                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-card rounded-full animate-pulse" />
                                            )}
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className={`font-semibold text-foreground truncate group-hover:text-primary transition-colors ${
                                                    viewMode === 'list' ? 'text-base' : 'text-lg'
                                                }`}>
                                                    {pm.business_name || pm.user?.name}
                                                </h3>
                                                {pm.is_verified && (
                                                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                                                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Verified</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="flex items-center gap-4 mt-2 flex-wrap">
                                                {/* Rating */}
                                                <div className="flex items-center gap-1.5">
                                                    <div className="flex items-center gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star 
                                                                key={i} 
                                                                className={`w-3.5 h-3.5 ${
                                                                    i < Math.floor(pm.rating || 0) 
                                                                        ? 'text-amber-400 fill-amber-400' 
                                                                        : 'text-muted-foreground/30'
                                                                }`} 
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-sm font-semibold text-foreground">{pm.rating || '0.0'}</span>
                                                    <span className="text-xs text-muted-foreground">({pm.review_count || 0})</span>
                                                </div>
                                                
                                                {/* Status */}
                                                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                                                    pm.is_online 
                                                        ? 'text-emerald-600 dark:text-emerald-400' 
                                                        : 'text-muted-foreground'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${pm.is_online ? 'bg-emerald-500' : 'bg-muted-foreground/50'}`} />
                                                    {pm.is_online ? 'Available now' : 'Offline'}
                                                </span>
                                            </div>
                                            
                                            {/* Location */}
                                            <div className="flex items-center gap-1.5 mt-3 text-sm text-muted-foreground">
                                                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                                <span className="truncate">{pm.city || pm.province || 'Philippines'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Hover arrow indicator */}
                                    <div className={`${viewMode === 'list' ? '' : 'absolute bottom-5 right-5'} opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300`}>
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {propertyManagers.data.length === 0 && (
                        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-center py-16 px-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
                            <div className="relative">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center">
                                    <Search className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">No property managers found</h3>
                                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                    We couldn't find any property managers matching your criteria. Try adjusting your filters or search in a different area.
                                </p>
                                <Link
                                    href={route('search')}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:ring-2 hover:ring-primary/30 transition-all duration-300"
                                >
                                    <Search className="w-4 h-4" />
                                    Search Property Managers
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Pagination */}
                    {propertyManagers.links && propertyManagers.links.length > 3 && (
                        <div className="mt-10 flex items-center justify-center gap-2">
                            {propertyManagers.links.map((link, index) => {
                                const isFirst = index === 0;
                                const isLast = index === propertyManagers.links.length - 1;
                                
                                return (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`inline-flex items-center justify-center min-w-[40px] h-10 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            link.active
                                                ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/25'
                                                : link.url
                                                    ? 'border border-border/50 text-foreground hover:border-primary/30 hover:bg-primary/5'
                                                    : 'border border-border/30 text-muted-foreground/50 cursor-not-allowed'
                                        }`}
                                        preserveState
                                    >
                                        {isFirst ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        ) : isLast ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        ) : (
                                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
