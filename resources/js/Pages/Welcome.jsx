import { Head, Link } from '@inertiajs/react';
import { useTheme } from '@/Contexts/ThemeContext';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Sun, Moon, Search, MapPin, Shield, MessageCircle, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Welcome({ auth }) {
    const { darkMode, toggleDarkMode } = useTheme();

    const features = [
        {
            icon: Shield,
            title: 'Verified Professionals',
            description: 'All property managers are vetted and verified to ensure quality service for your properties.'
        },
        {
            icon: MessageCircle,
            title: 'Direct Communication',
            description: 'Connect directly with property managers through our secure messaging system.'
        },
        {
            icon: Star,
            title: 'Honest Reviews',
            description: 'Read authentic reviews from property owners to make informed decisions.'
        },
        {
            icon: MapPin,
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
            <div className="min-h-screen bg-background relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    {/* Gradient Orbs */}
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/30 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-1/3 -left-40 w-80 h-80 bg-gradient-to-tr from-violet-500/20 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-tl from-cyan-500/15 to-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:64px_64px]" />
                    
                    {/* Radial fade */}
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
                </div>

                {/* Navigation */}
                <nav className="border-b border-border/50 bg-background/60 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <div className="flex items-center">
                                <ApplicationLogo className="h-9 w-auto" />
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-accent/80 transition-all duration-200 hover:shadow-sm"
                                >
                                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </button>

                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:ring-2 hover:ring-primary/30 transition-all duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:ring-2 hover:ring-primary/30 transition-all duration-300"
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
                <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 text-primary text-sm font-medium mb-8 shadow-lg shadow-primary/10">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                Trusted by 2,000+ Property Owners
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                                <span className="text-foreground">Find the Perfect</span>{' '}
                                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">Property Manager</span>{' '}
                                <span className="text-foreground">for Your Investment</span>
                            </h1>
                            
                            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                                Connect with verified property management professionals in the Philippines. 
                                Compare ratings, services, and find the right match for your property.
                            </p>

                            {/* Search Box */}
                            <div className="mt-10 max-w-2xl mx-auto">
                                <form action={route('search')} className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                                    <div className="relative flex items-center bg-card/90 backdrop-blur-xl border-2 border-border/50 rounded-2xl shadow-2xl overflow-hidden focus-within:border-primary/50 transition-all duration-300">
                                        <div className="pl-5">
                                            <MapPin className="w-6 h-6 text-primary" />
                                        </div>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="Enter city or location..."
                                            className="flex-1 px-4 py-5 text-lg bg-transparent border-0 focus:outline-none focus:ring-0 text-foreground placeholder:text-muted-foreground"
                                        />
                                        <button 
                                            type="submit" 
                                            className="m-2 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 text-white font-semibold rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:ring-2 hover:ring-primary/30"
                                        >
                                            <Search className="h-5 w-5" />
                                            <span className="hidden sm:inline">Search</span>
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-6 flex flex-wrap justify-center gap-2">
                                    <span className="text-sm text-muted-foreground">Popular:</span>
                                    {['Metro Manila', 'Cebu', 'Davao', 'Quezon City', 'Makati'].map((city) => (
                                        <a 
                                            key={city}
                                            href={route('search') + '?location=' + city}
                                            className="px-3 py-1.5 text-sm rounded-full bg-card/80 border border-border/50 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all duration-200 backdrop-blur-sm"
                                        >
                                            {city}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="relative py-20 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5" />
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,hsl(var(--border)/0.1)_25%,transparent_25%,transparent_50%,hsl(var(--border)/0.1)_50%,hsl(var(--border)/0.1)_75%,transparent_75%)] bg-[size:24px_24px]" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="group text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 shadow-sm">
                                    <div className="text-3xl sm:text-4xl font-bold text-primary">
                                        {stat.value}
                                        {stat.suffix && <span className="text-amber-500">{stat.suffix}</span>}
                                    </div>
                                    <div className="mt-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="relative py-24 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold">
                                <span className="text-foreground">Why Choose </span>
                                <span className="text-primary">PM Finder</span>
                                <span className="text-foreground">?</span>
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                                We make finding the right property manager simple, transparent, and hassle-free.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={index} className="feature-card">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="text-base font-semibold text-foreground">
                                                {feature.title}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="relative overflow-hidden rounded-3xl bg-gray-900 p-12 text-center shadow-2xl">
                            {/* Gradient accent */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-600/20 to-pink-600/20" />
                            
                            {/* Floating orbs */}
                            <div className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
                            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl" />
                            
                            <div className="relative z-10">
                                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                    Are You a Property Manager?
                                </h2>
                                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Join our growing network of professional property managers. 
                                    Get discovered by property owners looking for your services.
                                </p>
                                <Link 
                                    href={route('register')} 
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-bold hover:from-primary/90 hover:to-purple-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-primary/30"
                                >
                                    List Your Business
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative py-12 border-t border-border bg-card">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                <ApplicationLogo className="h-8 w-auto" />
                                <span className="text-sm text-muted-foreground">
                                    © 2026 PM Finder. All rights reserved.
                                </span>
                            </div>
                            <div className="flex items-center gap-6">
                                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">
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
