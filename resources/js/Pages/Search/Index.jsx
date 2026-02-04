import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import { useTheme } from '@/Contexts/ThemeContext';
import { Search, MapPin, Star, CheckCircle, Sun, Moon, Filter } from 'lucide-react';

export default function SearchIndex({ propertyManagers, filters }) {
    const { auth } = usePage().props;
    const { darkMode, toggleDarkMode } = useTheme();
    
    // Use individual state fields to prevent full re-render
    const [location, setLocation] = useState(filters.location || '');
    const [serviceType, setServiceType] = useState(filters.service_type || '');
    const [minRating, setMinRating] = useState(filters.min_rating || '');
    const [verifiedOnly, setVerifiedOnly] = useState(filters.verified_only || false);

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        router.get(route('search'), {
            location,
            service_type: serviceType,
            min_rating: minRating,
            verified_only: verifiedOnly,
        }, { preserveState: true });
    }, [location, serviceType, minRating, verifiedOnly]);

    const searchContent = (
        <>
            <Head title="Find Property Managers" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Search Form */}
                    <div className="relative overflow-hidden mb-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
                        <div className="relative p-6">
                            <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-semibold text-foreground mb-2">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="text"
                                            placeholder="City, Province, or Barangay"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full rounded-xl border border-border bg-background text-foreground pl-10 pr-4 py-2.5 shadow-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Service Type</label>
                                    <select
                                        value={serviceType}
                                        onChange={(e) => setServiceType(e.target.value)}
                                        className="w-full rounded-xl border border-border bg-background text-foreground px-4 py-2.5 shadow-sm transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="">All Types</option>
                                        <option value="Residential">Residential</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Condo">Condo</option>
                                        <option value="Vacation Rental">Vacation Rental</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Min Rating</label>
                                    <select
                                        value={minRating}
                                        onChange={(e) => setMinRating(e.target.value)}
                                        className="w-full rounded-xl border border-border bg-background text-foreground px-4 py-2.5 shadow-sm transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="">Any Rating</option>
                                        <option value="4">4+ Stars</option>
                                        <option value="3">3+ Stars</option>
                                        <option value="2">2+ Stars</option>
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-purple-600 px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:ring-2 hover:ring-primary/30 w-full">
                                        <Search className="w-4 h-4" />
                                        Search
                                    </button>
                                </div>
                            </form>
                            <div className="mt-4 flex items-center">
                                <input
                                    type="checkbox"
                                    id="verified_only"
                                    checked={verifiedOnly}
                                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                                    className="h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary cursor-pointer"
                                />
                                <label htmlFor="verified_only" className="ml-2 text-sm text-muted-foreground cursor-pointer">
                                    Verified only
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4 text-sm text-muted-foreground font-medium">
                        {propertyManagers.total} property manager{propertyManagers.total !== 1 ? 's' : ''} found
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {propertyManagers.data.length > 0 ? (
                            propertyManagers.data.map((pm) => (
                                <Link
                                    key={pm.id}
                                    href={route('property-managers.show', pm.id)}
                                    className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/30"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center shrink-0 ring-2 ring-primary/10">
                                                <span className="text-2xl font-bold text-primary">
                                                    {pm.business_name?.[0] || pm.user?.name?.[0] || 'P'}
                                                </span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                                    {pm.business_name || pm.user?.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex items-center">
                                                        <Star className="w-4 h-4 text-primary fill-primary" />
                                                        <span className="ml-1 text-sm font-mono text-muted-foreground">
                                                            {Number(pm.rating).toFixed(1) || '0.0'}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        ({pm.review_count} reviews)
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                    {pm.is_verified && (
                                                        <div className="flex items-center gap-1">
                                                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                            <span className="text-xs text-emerald-500 font-medium">Verified</span>
                                                        </div>
                                                    )}
                                                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                                                        pm.is_online 
                                                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                                                            : 'bg-muted text-muted-foreground'
                                                    }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${pm.is_online ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground/50'}`}></span>
                                                        {pm.is_online ? 'Online' : 'Offline'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-border">
                                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {pm.city || pm.province || 'Philippines'}
                                            </p>
                                            {pm.service_types && pm.service_types.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {pm.service_types.slice(0, 3).map((type) => (
                                                        <span
                                                            key={type}
                                                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                                                        >
                                                            {type}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full">
                                <div className="rounded-2xl border border-border bg-card">
                                    <div className="p-12 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                            <Search className="w-6 h-6" />
                                        </div>
                                        <p className="text-muted-foreground">
                                            No property managers found. Try adjusting your search criteria.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {propertyManagers.links && propertyManagers.links.length > 3 && (
                        <div className="mt-8 flex justify-center">
                            <nav className="flex gap-2">
                                {propertyManagers.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            link.active
                                                ? 'bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-md'
                                                : 'bg-card text-muted-foreground hover:bg-accent hover:text-primary border border-border hover:border-primary/30 hover:shadow-sm'
                                        } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    // Authenticated users get the full layout
    if (auth?.user) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold text-foreground">
                        Find Property Managers
                    </h2>
                }
            >
                {searchContent}
            </AuthenticatedLayout>
        );
    }

    // Guest users get a simple nav
    return (
        <div className="min-h-screen bg-background hex-pattern">
            <nav className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <Link href="/" className="transition-transform hover:scale-105">
                            <ApplicationLogo className="h-9" />
                        </Link>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-accent transition-all duration-200 hover:shadow-sm"
                            >
                                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            <Link href={route('login')} className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                                Login
                            </Link>
                            <Link href={route('register')} className="inline-flex items-center rounded-xl bg-gradient-to-r from-primary to-purple-600 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            {searchContent}
        </div>
    );
}
