import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useTheme } from '@/Contexts/ThemeContext';
import { Star, MapPin, Phone, CheckCircle, Heart, MessageSquare, Building2, Shield, Clock, ArrowLeft, Sun, Moon } from 'lucide-react';

export default function PropertyManagerShow({ propertyManager, isSaved }) {
    const { auth } = usePage().props;
    const { darkMode, toggleDarkMode } = useTheme();

    const handleToggleSave = () => {
        router.post(route('property-managers.toggle-save', propertyManager.id));
    };

    const content = (
        <>
            <Head title={propertyManager.business_name || propertyManager.user?.name} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <Link 
                        href={route('property-managers.index')} 
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Property Managers
                    </Link>

                    {/* Main Card */}
                    <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm">
                        {/* Header with gradient */}
                        <div className="relative overflow-hidden border-b border-border/50">
                            {/* Background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent" />
                            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            
                            <div className="relative p-8">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                                    <div className="flex items-start gap-5">
                                        {/* Avatar with gradient ring */}
                                        <div className="relative flex-shrink-0">
                                            <div className="absolute -inset-1.5 bg-gradient-to-br from-primary to-purple-600 rounded-2xl blur opacity-50" />
                                            <div className="relative h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 dark:from-primary/20 dark:to-purple-500/20 border-2 border-primary/30 flex items-center justify-center">
                                                <span className="text-4xl font-bold bg-gradient-to-br from-primary to-purple-600 bg-clip-text text-transparent">
                                                    {propertyManager.business_name?.[0] || propertyManager.user?.name?.[0] || 'P'}
                                                </span>
                                            </div>
                                            {/* Online indicator */}
                                            {propertyManager.is_online && (
                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-3 border-card rounded-full flex items-center justify-center">
                                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                                                    {propertyManager.business_name || propertyManager.user?.name}
                                                </h1>
                                                {propertyManager.is_verified && (
                                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Verified</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Rating */}
                                            <div className="flex items-center gap-3 mt-3">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star 
                                                            key={i} 
                                                            className={`w-5 h-5 ${i < Math.round(propertyManager.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-lg font-semibold text-foreground">{propertyManager.rating || '0.0'}</span>
                                                <span className="text-muted-foreground">({propertyManager.review_count || 0} reviews)</span>
                                            </div>
                                            
                                            {/* Location */}
                                            <div className="flex items-center gap-2 mt-3 text-muted-foreground">
                                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                                <span>{[propertyManager.barangay, propertyManager.city, propertyManager.province].filter(Boolean).join(', ') || 'Philippines'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    {auth?.user && (
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={handleToggleSave}
                                                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 font-medium transition-all duration-300 ${
                                                    isSaved 
                                                        ? 'border-pink-500 bg-pink-500/10 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20' 
                                                        : 'border-border hover:border-pink-500/50 text-foreground hover:text-pink-500'
                                                }`}
                                            >
                                                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                                                {isSaved ? 'Saved' : 'Save'}
                                            </button>
                                            <Link
                                                href={route('inquiries.create', { property_manager_id: propertyManager.id })}
                                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:ring-2 hover:ring-primary/30 transition-all duration-300"
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                                Contact
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3">
                            {/* Main Content */}
                            <div className="lg:col-span-2 p-8 space-y-8">
                                {/* About */}
                                <section>
                                    <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <div className="w-1 h-5 bg-gradient-to-b from-primary to-purple-600 rounded-full" />
                                        About
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {propertyManager.bio || 'No description provided.'}
                                    </p>
                                </section>

                                {/* Services */}
                                {propertyManager.services && propertyManager.services.length > 0 && (
                                    <section>
                                        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                            <div className="w-1 h-5 bg-gradient-to-b from-primary to-purple-600 rounded-full" />
                                            Services Offered
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {propertyManager.services.map((service) => (
                                                <div 
                                                    key={service} 
                                                    className="flex items-center gap-3 p-3 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-purple-600" />
                                                    <span className="text-foreground">{service}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Service Types */}
                                {propertyManager.service_types && propertyManager.service_types.length > 0 && (
                                    <section>
                                        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                            <div className="w-1 h-5 bg-gradient-to-b from-primary to-purple-600 rounded-full" />
                                            Property Types
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {propertyManager.service_types.map((type) => (
                                                <span
                                                    key={type}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary"
                                                >
                                                    <Building2 className="w-3.5 h-3.5" />
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Portfolio */}
                                {propertyManager.properties && propertyManager.properties.length > 0 && (
                                    <section>
                                        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                            <div className="w-1 h-5 bg-gradient-to-b from-primary to-purple-600 rounded-full" />
                                            Portfolio
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {propertyManager.properties.map((property) => (
                                                <div 
                                                    key={property.id} 
                                                    className="group relative overflow-hidden rounded-xl border border-border/50 p-5 hover:border-primary/30 transition-all duration-300"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <div className="relative">
                                                        <h3 className="font-semibold text-foreground">{property.title}</h3>
                                                        <p className="text-sm text-primary mt-1">{property.property_type}</p>
                                                        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
                                                            <MapPin className="w-3.5 h-3.5" />
                                                            {property.location}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Reviews */}
                                <section>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                            <div className="w-1 h-5 bg-gradient-to-b from-primary to-purple-600 rounded-full" />
                                            Reviews
                                        </h2>
                                        {auth?.user && auth.user.role === 'owner' && (
                                            <Link
                                                href={route('reviews.create', { property_manager_id: propertyManager.id })}
                                                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                                            >
                                                Write a review →
                                            </Link>
                                        )}
                                    </div>
                                    {propertyManager.reviews && propertyManager.reviews.length > 0 ? (
                                        <div className="space-y-4">
                                            {propertyManager.reviews.map((review) => (
                                                <div 
                                                    key={review.id} 
                                                    className="p-5 rounded-xl border border-border/50 hover:border-primary/20 transition-colors"
                                                >
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star 
                                                                    key={i} 
                                                                    className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {new Date(review.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-foreground">{review.comment || 'No comment'}</p>
                                                    <p className="mt-3 text-sm text-muted-foreground">— {review.user?.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 rounded-xl border border-dashed border-border/50">
                                            <Star className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                                            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                                        </div>
                                    )}
                                </section>
                            </div>

                            {/* Sidebar */}
                            <div className="p-8 border-t lg:border-t-0 lg:border-l border-border/50 bg-muted/20">
                                {/* Service Areas */}
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-primary" />
                                        Service Areas
                                    </h2>
                                    {propertyManager.service_areas && propertyManager.service_areas.length > 0 ? (
                                        <ul className="space-y-3">
                                            {propertyManager.service_areas.map((area) => (
                                                <li 
                                                    key={area.id} 
                                                    className="flex items-start gap-3 p-3 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
                                                >
                                                    <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                                                    <span className="text-foreground">{[area.barangay, area.city, area.province].filter(Boolean).join(', ')}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-muted-foreground text-sm">
                                            {propertyManager.city || propertyManager.province || 'Contact for service areas'}
                                        </p>
                                    )}
                                </div>

                                {/* Contact Info */}
                                {auth?.user && propertyManager.phone && (
                                    <div className="mb-8">
                                        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                            <Phone className="w-5 h-5 text-primary" />
                                            Contact
                                        </h2>
                                        <a 
                                            href={`tel:${propertyManager.phone}`}
                                            className="flex items-center gap-3 p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                                        >
                                            <div className="p-2 rounded-lg bg-primary/10">
                                                <Phone className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-foreground font-medium">{propertyManager.phone}</span>
                                        </a>
                                    </div>
                                )}

                                {/* Login Prompt */}
                                {!auth?.user && (
                                    <div className="relative overflow-hidden p-5 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-purple-500/5">
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
                                        <div className="relative">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Shield className="w-5 h-5 text-primary" />
                                                <span className="font-semibold text-foreground">Want to connect?</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                Log in to see contact information and send inquiries.
                                            </p>
                                            <Link 
                                                href={route('login')} 
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                                            >
                                                Log in to continue
                                            </Link>
                                        </div>
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
        <div className="min-h-screen bg-background">
            <nav className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="h-8" />
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                            >
                                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            <Link href={route('login')} className="text-muted-foreground hover:text-primary transition-colors">
                                Login
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
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
