import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function PropertyManagerEdit({ propertyManager }) {
    const { data, setData, put, processing, errors } = useForm({
        business_name: propertyManager.business_name || '',
        bio: propertyManager.bio || '',
        phone: propertyManager.phone || '',
        services: propertyManager.services || [],
        service_types: propertyManager.service_types || [],
        address: propertyManager.address || '',
        city: propertyManager.city || '',
        province: propertyManager.province || '',
        barangay: propertyManager.barangay || '',
        service_radius_km: propertyManager.service_radius_km || 10,
        is_available: propertyManager.is_available ?? true,
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
        put(route('property-managers.update', propertyManager.id));
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
            header={<h2 className="text-xl font-semibold leading-tight text-[foreground]">Edit Profile</h2>}
        >
            <Head title="Edit PM Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="card">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Availability Toggle */}
                            <div className="flex items-center justify-between p-4 bg-[var(--layer-02)] rounded-lg border border-[border]">
                                <div>
                                    <h3 className="font-medium text-[foreground]">Availability</h3>
                                    <p className="text-sm text-[var(--text-muted)]">Toggle whether you appear in search results</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setData('is_available', !data.is_available)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        data.is_available ? 'bg-primary' : 'bg-[border]'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            data.is_available ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Business Name */}
                            <div>
                                <label className="block text-sm font-medium text-[muted-foreground] mb-1">Business Name</label>
                                <input
                                    type="text"
                                    value={data.business_name}
                                    onChange={(e) => setData('business_name', e.target.value)}
                                    className="input"
                                />
                                {errors.business_name && <p className="mt-1 text-sm text-red-500">{errors.business_name}</p>}
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-[muted-foreground] mb-1">About / Bio</label>
                                <textarea
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    rows={4}
                                    className="input"
                                />
                                {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-[muted-foreground] mb-1">Contact Phone</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="input"
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                            </div>

                            {/* Service Types */}
                            <div>
                                <label className="block text-sm font-medium text-[muted-foreground] mb-2">Property Types</label>
                                <div className="flex flex-wrap gap-2">
                                    {availableServiceTypes.map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => toggleServiceType(type)}
                                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                                data.service_types.includes(type)
                                                    ? 'bg-primary text-black'
                                                    : 'bg-[var(--layer-02)] text-[muted-foreground] hover:bg-[border] border border-[border]'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Services */}
                            <div>
                                <label className="block text-sm font-medium text-[muted-foreground] mb-2">Services</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {availableServices.map((service) => (
                                        <label key={service} className="flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={data.services.includes(service)}
                                                onChange={() => toggleService(service)}
                                                className="h-4 w-4 rounded border-[border] bg-[var(--layer-01)] text-primary focus:ring-primary"
                                            />
                                            <span className="ml-2 text-sm text-[muted-foreground]">{service}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label className="block text-sm font-medium text-[muted-foreground] mb-1">Province</label>
                                    <input
                                        type="text"
                                        value={data.province}
                                        onChange={(e) => setData('province', e.target.value)}
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[muted-foreground] mb-1">City</label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[muted-foreground] mb-1">Barangay</label>
                                    <input
                                        type="text"
                                        value={data.barangay}
                                        onChange={(e) => setData('barangay', e.target.value)}
                                        className="input"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-[muted-foreground] mb-1">Full Address</label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="input"
                                />
                            </div>

                            {/* Service Radius */}
                            <div>
                                <label className="block text-sm font-medium text-[muted-foreground] mb-1">Service Radius (km)</label>
                                <input
                                    type="number"
                                    value={data.service_radius_km}
                                    onChange={(e) => setData('service_radius_km', e.target.value)}
                                    min="1"
                                    max="100"
                                    className="input w-32"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn-primary disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
