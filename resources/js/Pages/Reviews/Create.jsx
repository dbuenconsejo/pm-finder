import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Star, MapPin, ArrowLeft } from 'lucide-react';

export default function ReviewCreate({ propertyManager }) {
    const { data, setData, post, processing, errors } = useForm({
        property_manager_id: propertyManager.id,
        rating: 5,
        comment: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reviews.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Write a Review</h2>
                    <p className="text-sm text-muted-foreground mt-1">Share your experience with this property manager</p>
                </div>
            }
        >
            <Head title="Write a Review" />

            <div className="py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                        {/* Gradient accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-primary to-amber-400" />
                        
                        {/* PM Info Header */}
                        <div className="border-b border-border/50 bg-primary/5 px-6 py-5">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="absolute -inset-1 bg-gradient-to-br from-primary to-purple-600 rounded-xl blur opacity-30" />
                                    <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-primary/30 flex items-center justify-center">
                                        <span className="text-xl font-bold bg-gradient-to-br from-primary to-purple-600 bg-clip-text text-transparent">
                                            {propertyManager.business_name?.[0] || propertyManager.user?.name?.[0] || 'P'}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground text-lg">
                                        {propertyManager.business_name || propertyManager.user?.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {propertyManager.city}, {propertyManager.province}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-3">How would you rate your experience?</label>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setData('rating', star)}
                                            className="group focus:outline-none transition-all duration-200"
                                        >
                                            <Star 
                                                className={`w-10 h-10 transition-all duration-200 ${
                                                    star <= data.rating 
                                                        ? 'text-amber-400 fill-amber-400 drop-shadow-lg' 
                                                        : 'text-muted-foreground/30 group-hover:text-amber-300'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                    <span className="ml-3 text-2xl font-bold text-foreground">{data.rating}.0</span>
                                </div>
                                {errors.rating && <p className="mt-2 text-sm text-red-500">{errors.rating}</p>}
                            </div>

                            {/* Comment */}
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-2">Your Review</label>
                                <textarea
                                    value={data.comment}
                                    onChange={(e) => setData('comment', e.target.value)}
                                    rows={5}
                                    className="w-full rounded-xl border border-border bg-background text-foreground px-4 py-3 shadow-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-lg focus:outline-none resize-none"
                                    placeholder="Share your experience with this property manager..."
                                />
                                {errors.comment && <p className="mt-2 text-sm text-red-500">{errors.comment}</p>}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between items-center pt-4 border-t border-border/50">
                                <Link
                                    href={route('property-managers.show', propertyManager.id)}
                                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to profile
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:ring-2 hover:ring-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
