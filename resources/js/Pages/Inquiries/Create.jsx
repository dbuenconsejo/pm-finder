import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function InquiryCreate({ propertyManager }) {
    const { data, setData, post, processing, errors } = useForm({
        property_manager_id: propertyManager.id,
        subject: '',
        property_type: '',
        property_location: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('inquiries.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-[var(--text-primary)]">Send Inquiry</h2>}
        >
            <Head title="Send Inquiry" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="card">
                        {/* PM Info */}
                        <div className="border-b border-[var(--border-color)] bg-[var(--layer-02)] px-6 py-4">
                            <div className="flex items-center space-x-4">
                                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center border-2 border-amber-400">
                                    <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                                        {propertyManager.business_name?.[0] || propertyManager.user?.name?.[0] || 'P'}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-primary)]">
                                        Send Inquiry to {propertyManager.business_name || propertyManager.user?.name}
                                    </h3>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        {propertyManager.city}, {propertyManager.province}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Subject */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Subject *</label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="input"
                                    placeholder="e.g., Looking for property management services"
                                    required
                                />
                                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                            </div>

                            {/* Property Type */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Property Type</label>
                                <select
                                    value={data.property_type}
                                    onChange={(e) => setData('property_type', e.target.value)}
                                    className="input"
                                >
                                    <option value="">Select type</option>
                                    <option value="Residential">Residential</option>
                                    <option value="Commercial">Commercial</option>
                                    <option value="Condo">Condo</option>
                                    <option value="Vacation Rental">Vacation Rental</option>
                                </select>
                            </div>

                            {/* Property Location */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Property Location</label>
                                <input
                                    type="text"
                                    value={data.property_location}
                                    onChange={(e) => setData('property_location', e.target.value)}
                                    className="input"
                                    placeholder="e.g., Cebu City, Lahug"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Message *</label>
                                <textarea
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    rows={5}
                                    className="input"
                                    placeholder="Describe your property and what services you need..."
                                    required
                                />
                                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-3">
                                <Link
                                    href={route('property-managers.show', propertyManager.id)}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-primary disabled:opacity-50"
                                >
                                    {processing ? 'Sending...' : 'Send Inquiry'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
