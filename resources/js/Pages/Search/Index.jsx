import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import { useTheme } from '@/Contexts/ThemeContext';

// Icons
const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const MapPinIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const StarIcon = ({ filled }) => (
    <svg className={`w-4 h-4 ${filled ? 'text-amber-500' : 'text-[var(--layer-3)]'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const VerifiedIcon = () => (
    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const SunIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

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
                    <div className="mb-8 card">
                        <div className="p-6">
                            <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Location</label>
                                    <input
                                        type="text"
                                        placeholder="City, Province, or Barangay"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Service Type</label>
                                    <select
                                        value={serviceType}
                                        onChange={(e) => setServiceType(e.target.value)}
                                        className="input"
                                    >
                                        <option value="">All Types</option>
                                        <option value="Residential">Residential</option>
                                        <option value="Commercial">Commercial</option>
                                        <option value="Condo">Condo</option>
                                        <option value="Vacation Rental">Vacation Rental</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Min Rating</label>
                                    <select
                                        value={minRating}
                                        onChange={(e) => setMinRating(e.target.value)}
                                        className="input"
                                    >
                                        <option value="">Any Rating</option>
                                        <option value="4">4+ Stars</option>
                                        <option value="3">3+ Stars</option>
                                        <option value="2">2+ Stars</option>
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <button type="submit" className="btn-primary w-full">
                                        <SearchIcon />
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
                                    className="h-4 w-4 rounded border-[var(--layer-3)] bg-[var(--layer-1)] text-amber-500 focus:ring-amber-500"
                                />
                                <label htmlFor="verified_only" className="ml-2 text-sm text-[var(--text-secondary)]">
                                    Verified only
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4 text-sm text-[var(--text-tertiary)]">
                        {propertyManagers.total} property manager{propertyManagers.total !== 1 ? 's' : ''} found
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {propertyManagers.data.length > 0 ? (
                            propertyManagers.data.map((pm) => (
                                <Link
                                    key={pm.id}
                                    href={route('property-managers.show', pm.id)}
                                    className="card group hover:shadow-lg transition-all hover:border-amber-500"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                                                <span className="text-2xl font-bold text-amber-500">
                                                    {pm.business_name?.[0] || pm.user?.name?.[0] || 'P'}
                                                </span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-amber-500 transition-colors truncate">
                                                    {pm.business_name || pm.user?.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="flex items-center">
                                                        <StarIcon filled={true} />
                                                        <span className="ml-1 text-sm font-mono text-[var(--text-secondary)]">
                                                            {Number(pm.rating).toFixed(1) || '0.0'}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-[var(--text-tertiary)]">
                                                        ({pm.review_count} reviews)
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                    {pm.is_verified && (
                                                        <div className="flex items-center gap-1">
                                                            <VerifiedIcon />
                                                            <span className="text-xs text-green-500">Verified</span>
                                                        </div>
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
                                        <div className="mt-4 pt-4 border-t border-[var(--layer-3)]">
                                            <p className="text-sm text-[var(--text-tertiary)] flex items-center gap-1">
                                                <MapPinIcon />
                                                {pm.city || pm.province || 'Philippines'}
                                            </p>
                                            {pm.service_types && pm.service_types.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {pm.service_types.slice(0, 3).map((type) => (
                                                        <span
                                                            key={type}
                                                            className="badge badge-info"
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
                                <div className="card">
                                    <div className="p-12 text-center">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--layer-2)] flex items-center justify-center text-[var(--text-tertiary)]">
                                            <SearchIcon />
                                        </div>
                                        <p className="text-[var(--text-tertiary)]">
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
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            link.active
                                                ? 'bg-amber-500 text-black'
                                                : 'bg-[var(--layer-1)] text-[var(--text-secondary)] hover:bg-[var(--layer-2)] hover:text-amber-500 border border-[var(--layer-3)]'
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
                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">
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
        <div className="min-h-screen bg-[var(--background)] hex-pattern">
            <nav className="border-b border-[var(--layer-3)] bg-[var(--layer-1)]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <Link href="/">
                            <ApplicationLogo className="h-9" />
                        </Link>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-amber-500 hover:bg-[var(--layer-2)] transition-colors"
                            >
                                {darkMode ? <SunIcon /> : <MoonIcon />}
                            </button>
                            <Link href={route('login')} className="text-sm text-[var(--text-secondary)] hover:text-amber-500 transition-colors">
                                Login
                            </Link>
                            <Link href={route('register')} className="btn-primary">
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
