import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useTheme } from '@/Contexts/ThemeContext';

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

export default function PropertyManagerShow({ propertyManager, isSaved }) {
    const { auth } = usePage().props;
    const { darkMode, toggleDarkMode } = useTheme();

    const handleToggleSave = () => {
        router.post(route('property-managers.toggle-save', propertyManager.id));
    };

    const content = (
        <>
            <Head title={propertyManager.business_name || propertyManager.user?.name} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="card overflow-hidden">
                        {/* Header */}
                        <div className="border-b border-[var(--border-color)] bg-gradient-to-r from-amber-50/50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/20 p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="h-20 w-20 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center border-2 border-amber-400">
                                        <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                                            {propertyManager.business_name?.[0] || propertyManager.user?.name?.[0] || 'P'}
                                        </span>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                                            {propertyManager.business_name || propertyManager.user?.name}
                                        </h1>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={i < Math.round(propertyManager.rating) ? 'text-amber-500' : 'text-gray-400 dark:text-gray-600'}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-[var(--text-secondary)]">({propertyManager.review_count} reviews)</span>
                                            {propertyManager.is_verified && (
                                                <span className="badge-success">
                                                    ✓ Verified
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[var(--text-secondary)] mt-1">
                                            📍 {[propertyManager.barangay, propertyManager.city, propertyManager.province].filter(Boolean).join(', ') || 'Philippines'}
                                        </p>
                                    </div>
                                </div>
                                {auth?.user && (
                                    <div className="mt-4 sm:mt-0 flex space-x-3">
                                        <button
                                            onClick={handleToggleSave}
                                            className={`btn-secondary ${isSaved ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-400 text-amber-700 dark:text-amber-400' : ''}`}
                                        >
                                            {isSaved ? '♥ Saved' : '♡ Save'}
                                        </button>
                                        <Link
                                            href={route('inquiries.create', { property_manager_id: propertyManager.id })}
                                            className="btn-primary"
                                        >
                                            Contact
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:divide-x divide-[var(--border-color)]">
                            {/* Main Content */}
                            <div className="lg:col-span-2 p-6">
                                {/* About */}
                                <section className="mb-8">
                                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">About</h2>
                                    <p className="text-[var(--text-secondary)]">
                                        {propertyManager.bio || 'No description provided.'}
                                    </p>
                                </section>

                                {/* Services */}
                                {propertyManager.services && propertyManager.services.length > 0 && (
                                    <section className="mb-8">
                                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Services</h2>
                                        <div className="grid grid-cols-2 gap-2">
                                            {propertyManager.services.map((service) => (
                                                <div key={service} className="flex items-center text-[var(--text-secondary)]">
                                                    <span className="mr-2 text-amber-500">•</span>
                                                    {service}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Service Types */}
                                {propertyManager.service_types && propertyManager.service_types.length > 0 && (
                                    <section className="mb-8">
                                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Property Types</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {propertyManager.service_types.map((type) => (
                                                <span
                                                    key={type}
                                                    className="badge-primary"
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Portfolio */}
                                {propertyManager.properties && propertyManager.properties.length > 0 && (
                                    <section className="mb-8">
                                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Portfolio</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {propertyManager.properties.map((property) => (
                                                <div key={property.id} className="rounded-lg border border-[var(--border-color)] bg-[var(--layer-02)] p-4">
                                                    <h3 className="font-medium text-[var(--text-primary)]">{property.title}</h3>
                                                    <p className="text-sm text-amber-500">{property.property_type}</p>
                                                    <p className="text-sm text-[var(--text-secondary)] mt-1">{property.location}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Reviews */}
                                <section>
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Reviews</h2>
                                        {auth?.user && auth.user.role === 'owner' && (
                                            <Link
                                                href={route('reviews.create', { property_manager_id: propertyManager.id })}
                                                className="text-sm text-amber-500 hover:text-amber-400 hover:underline"
                                            >
                                                Write a review
                                            </Link>
                                        )}
                                    </div>
                                    {propertyManager.reviews && propertyManager.reviews.length > 0 ? (
                                        <div className="space-y-4">
                                            {propertyManager.reviews.map((review) => (
                                                <div key={review.id} className="border-b border-[var(--border-color)] pb-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center">
                                                            {[...Array(5)].map((_, i) => (
                                                                <span key={i} className={i < review.rating ? 'text-amber-500' : 'text-gray-400 dark:text-gray-600'}>
                                                                    ★
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <span className="text-sm text-[var(--text-muted)]">
                                                            {new Date(review.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="mt-2 text-[var(--text-secondary)]">{review.comment || 'No comment'}</p>
                                                    <p className="mt-1 text-sm text-[var(--text-muted)]">— {review.user?.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-[var(--text-muted)]">No reviews yet.</p>
                                    )}
                                </section>
                            </div>

                            {/* Sidebar */}
                            <div className="p-6 bg-[var(--layer-02)]">
                                <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Service Areas</h2>
                                {propertyManager.service_areas && propertyManager.service_areas.length > 0 ? (
                                    <ul className="space-y-2">
                                        {propertyManager.service_areas.map((area) => (
                                            <li key={area.id} className="text-[var(--text-secondary)]">
                                                📍 {[area.barangay, area.city, area.province].filter(Boolean).join(', ')}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-[var(--text-muted)]">
                                        {propertyManager.city || propertyManager.province || 'Contact for service areas'}
                                    </p>
                                )}

                                {auth?.user && propertyManager.phone && (
                                    <div className="mt-6">
                                        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Contact</h2>
                                        <p className="text-[var(--text-secondary)]">📞 {propertyManager.phone}</p>
                                    </div>
                                )}

                                {!auth?.user && (
                                    <div className="mt-6 p-4 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
                                        <p className="text-sm text-amber-800 dark:text-amber-300">
                                            <Link href={route('login')} className="font-semibold underline text-amber-600 dark:text-amber-400">Log in</Link> to see contact information and send inquiries.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    if (auth?.user) {
        return <AuthenticatedLayout>{content}</AuthenticatedLayout>;
    }

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <nav className="border-b border-[var(--border-color)] bg-[var(--layer-01)]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="h-8" />
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-amber-500 hover:bg-[var(--layer-02)] transition-colors"
                            >
                                {darkMode ? <SunIcon /> : <MoonIcon />}
                            </button>
                            <Link href={route('login')} className="text-[var(--text-secondary)] hover:text-amber-500 transition-colors">
                                Login
                            </Link>
                            <Link
                                href={route('register')}
                                className="btn-primary"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            {content}
        </div>
    );
}
