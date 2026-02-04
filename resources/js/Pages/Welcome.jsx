import { Head, Link } from '@inertiajs/react';
import { useTheme } from '@/Contexts/ThemeContext';
import ApplicationLogo from '@/Components/ApplicationLogo';

// Icons
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

const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const VerifiedIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
);

const MessageIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const StarIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);

const MapPinIcon = ({ className = "w-8 h-8" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

export default function Welcome({ auth }) {
    const { darkMode, toggleDarkMode } = useTheme();

    const features = [
        {
            icon: <VerifiedIcon />,
            title: 'Verified Professionals',
            description: 'All property managers are vetted and verified to ensure quality service for your properties.'
        },
        {
            icon: <MessageIcon />,
            title: 'Direct Communication',
            description: 'Connect directly with property managers through our secure messaging system.'
        },
        {
            icon: <StarIcon />,
            title: 'Honest Reviews',
            description: 'Read authentic reviews from property owners to make informed decisions.'
        },
        {
            icon: <MapPinIcon />,
            title: 'Location-Based Search',
            description: 'Find property managers servicing your specific area or neighborhood.'
        }
    ];

    const stats = [
        { value: '500+', label: 'Property Managers' },
        { value: '2,000+', label: 'Properties Managed' },
        { value: '4.8', label: 'Average Rating', suffix: '★' },
        { value: '98%', label: 'Satisfaction Rate' }
    ];

    return (
        <>
            <Head title="Find Your Property Manager" />
            <div className="min-h-screen bg-[var(--background)] hex-pattern">
                {/* Navigation */}
                <nav className="border-b border-[var(--layer-3)] bg-[var(--layer-1)]/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <div className="flex items-center">
                                <ApplicationLogo className="h-9 w-auto" />
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-amber-500 hover:bg-[var(--layer-2)] transition-colors"
                                >
                                    {darkMode ? <SunIcon /> : <MoonIcon />}
                                </button>

                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="btn-primary"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-amber-500 transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="btn-primary"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium mb-8">
                                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                                Trusted by 2,000+ Property Owners
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight">
                                Find the Perfect{' '}
                                <span className="text-amber-500">Property Manager</span>{' '}
                                for Your Investment
                            </h1>
                            
                            <p className="mt-6 text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                                Connect with verified property management professionals in the Philippines. 
                                Compare ratings, services, and find the right match for your property.
                            </p>

                            {/* Search Box */}
                            <div className="mt-10 max-w-2xl mx-auto">
                                <form action={route('search')} className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="Enter city or location..."
                                            className="input pl-12 py-4 text-lg"
                                        />
                                        <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
                                    </div>
                                    <button type="submit" className="btn-primary py-4 px-8 text-lg">
                                        <SearchIcon />
                                        Search
                                    </button>
                                </form>
                                <p className="mt-4 text-sm text-[var(--text-tertiary)]">
                                    Popular: Metro Manila, Cebu, Davao, Quezon City, Makati
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-[var(--layer-1)] border-y border-[var(--layer-3)]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl sm:text-4xl font-bold font-mono text-amber-500">
                                        {stat.value}
                                        {stat.suffix && <span className="text-amber-400">{stat.suffix}</span>}
                                    </div>
                                    <div className="mt-2 text-sm text-[var(--text-tertiary)]">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
                                Why Choose PM Finder?
                            </h2>
                            <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                                We make finding the right property manager simple, transparent, and hassle-free.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div 
                                    key={index} 
                                    className="stat-card group cursor-pointer"
                                >
                                    <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-500 group-hover:text-white transition-all">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-[var(--text-tertiary)]">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 to-amber-500 p-12 text-center shadow-xl">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2728%27 height=%2749%27 viewBox=%270 0 28 49%27%3E%3Cg fill-rule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fill-opacity=%270.1%27%3E%3Cpath d=%27M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                            
                            <div className="relative z-10">
                                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                    Are You a Property Manager?
                                </h2>
                                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                                    Join our growing network of professional property managers. 
                                    Get discovered by property owners looking for your services.
                                </p>
                                <Link 
                                    href={route('register')} 
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#0a0e14] text-white font-semibold hover:bg-[#1a1f28] transition-colors shadow-lg"
                                >
                                    List Your Business
                                    <ArrowRightIcon />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-12 border-t border-[var(--layer-3)] bg-[var(--layer-1)]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                <ApplicationLogo className="h-8 w-auto" />
                                <span className="text-sm text-[var(--text-tertiary)]">
                                    © 2026 PM Finder. All rights reserved.
                                </span>
                            </div>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-sm text-[var(--text-tertiary)] hover:text-amber-500 transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-sm text-[var(--text-tertiary)] hover:text-amber-500 transition-colors">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-sm text-[var(--text-tertiary)] hover:text-amber-500 transition-colors">
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
