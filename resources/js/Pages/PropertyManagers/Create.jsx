import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function PropertyManagerCreate() {
    const { data, setData, post, processing, errors } = useForm({
        business_name: '',
        bio: '',
        phone: '',
        services: [],
        service_types: [],
        address: '',
        city: '',
        province: '',
        barangay: '',
        service_radius_km: 10,
    });

    const availableServices = [
        'Tenant Screening',
        'Rent Collection',
        'Property Maintenance',
        'Financial Reporting',
        'Property Inspection',
        'Lease Management',
        'Emergency Response',
        'Utility Management',
    ];

    const availableServiceTypes = ['Residential', 'Commercial', 'Condo', 'Vacation Rental'];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('property-managers.store'));
    };

    const toggleService = (service) => {
        if (data.services.includes(service)) {
            setData('services', data.services.filter((s) => s !== service));
        } else {
            setData('services', [...data.services, service]);
        }
    };

    const toggleServiceType = (type) => {
        if (data.service_types.includes(type)) {
            setData('service_types', data.service_types.filter((t) => t !== type));
        } else {
            setData('service_types', [...data.service_types, type]);
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create Property Manager Profile</h2>}
        >
            <Head title="Create PM Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Business Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Business Name
                                </label>
                                <input
                                    type="text"
                                    value={data.business_name}
                                    onChange={(e) => setData('business_name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                    placeholder="Your business or professional name"
                                />
                                {errors.business_name && <p className="mt-1 text-sm text-red-600">{errors.business_name}</p>}
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    About / Bio
                                </label>
                                <textarea
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                    placeholder="Tell potential clients about yourself and your experience..."
                                />
                                {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Contact Phone
                                </label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                    placeholder="+63 XXX XXX XXXX"
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                            </div>

                            {/* Service Types */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Property Types You Manage
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {availableServiceTypes.map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => toggleServiceType(type)}
                                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                                data.service_types.includes(type)
                                                    ? 'bg-amber-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                {errors.service_types && <p className="mt-1 text-sm text-red-600">{errors.service_types}</p>}
                            </div>

                            {/* Services */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Services You Offer
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {availableServices.map((service) => (
                                        <label key={service} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.services.includes(service)}
                                                onChange={() => toggleService(service)}
                                                className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{service}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.services && <p className="mt-1 text-sm text-red-600">{errors.services}</p>}
                            </div>

                            {/* Location */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Province</label>
                                    <input
                                        type="text"
                                        value={data.province}
                                        onChange={(e) => setData('province', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                        placeholder="e.g., Cebu"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                        placeholder="e.g., Cebu City"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Barangay</label>
                                    <input
                                        type="text"
                                        value={data.barangay}
                                        onChange={(e) => setData('barangay', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                        placeholder="e.g., Lahug"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Address</label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                    placeholder="Street address (optional)"
                                />
                            </div>

                            {/* Service Radius */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Service Radius (km)
                                </label>
                                <input
                                    type="number"
                                    value={data.service_radius_km}
                                    onChange={(e) => setData('service_radius_km', e.target.value)}
                                    min="1"
                                    max="100"
                                    className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-amber-600 px-6 py-2 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-50"
                                >
                                    {processing ? 'Creating...' : 'Create Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
