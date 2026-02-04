import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

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
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Write a Review</h2>}
        >
            <Head title="Write a Review" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        {/* PM Info */}
                        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                            <div className="flex items-center space-x-4">
                                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                                    <span className="text-xl font-bold text-amber-600">
                                        {propertyManager.business_name?.[0] || propertyManager.user?.name?.[0] || 'P'}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Review {propertyManager.business_name || propertyManager.user?.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {propertyManager.city}, {propertyManager.province}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setData('rating', star)}
                                            className="text-3xl focus:outline-none"
                                        >
                                            <span className={star <= data.rating ? 'text-amber-500' : 'text-gray-300'}>
                                                ★
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                {errors.rating && <p className="mt-1 text-sm text-red-600">{errors.rating}</p>}
                            </div>

                            {/* Comment */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Your Review</label>
                                <textarea
                                    value={data.comment}
                                    onChange={(e) => setData('comment', e.target.value)}
                                    rows={5}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                    placeholder="Share your experience with this property manager..."
                                />
                                {errors.comment && <p className="mt-1 text-sm text-red-600">{errors.comment}</p>}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-3">
                                <Link
                                    href={route('property-managers.show', propertyManager.id)}
                                    className="rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-50"
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
