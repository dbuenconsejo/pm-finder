import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Building2, Phone, MapPin, Briefcase, User, Camera, X } from 'lucide-react';
import { useState, useRef } from 'react';

export default function PropertyManagerCreate() {
    const { data, setData, post, processing, errors, progress } = useForm({
        business_name: '',
        bio: '',
        phone: '',
        avatar: null,
        services: [],
        service_types: [],
        address: '',
        city: '',
        province: '',
        barangay: '',
        service_radius_km: 10,
    });

    const [avatarPreview, setAvatarPreview] = useState(null);
    const avatarInputRef = useRef(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            const reader = new FileReader();
            reader.onload = (e) => setAvatarPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const removeAvatar = () => {
        setData('avatar', null);
        setAvatarPreview(null);
        if (avatarInputRef.current) avatarInputRef.current.value = '';
    };

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
        post(route('property-managers.store'), {
            forceFormData: true,
        });
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
            header={
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Create Property Manager Profile</h2>
                    <p className="text-sm text-muted-foreground mt-1">Set up your professional profile to start receiving inquiries</p>
                </div>
            }
        >
            <Head title="Create PM Profile" />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                        {/* Gradient accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />
                        
                        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
                            {/* Business Name */}
                            <div className="group">
                                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                                    <User className="w-4 h-4 text-primary" />
                                    Business Name
                                </label>
                                <input
                                    type="text"
                                    value={data.business_name}
                                    onChange={(e) => setData('business_name', e.target.value)}
                                    className="w-full rounded-xl border border-border bg-background text-foreground px-4 py-3 shadow-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-lg focus:outline-none"
                                    placeholder="Your business or professional name"
                                />
                                {errors.business_name && <p className="mt-2 text-sm text-red-500">{errors.business_name}</p>}
                            </div>

                            {/* Profile Picture */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                                    <Camera className="w-4 h-4 text-primary" />
                                    Profile Picture
                                </label>
                                <div className="flex items-center gap-6">
                                    <div className="relative flex-shrink-0">
                                        {avatarPreview ? (
                                            <div className="relative">
                                                <img 
                                                    src={avatarPreview} 
                                                    alt="Preview" 
                                                    className="w-24 h-24 rounded-2xl object-cover border-2 border-primary/30 shadow-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={removeAvatar}
                                                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 border-2 border-dashed border-border flex items-center justify-center">
                                                <Camera className="w-8 h-8 text-muted-foreground/50" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            ref={avatarInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={handleAvatarChange}
                                            className="hidden"
                                            id="avatar-upload"
                                        />
                                        <label
                                            htmlFor="avatar-upload"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-all duration-200"
                                        >
                                            <Camera className="w-4 h-4" />
                                            {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                                        </label>
                                        <p className="text-xs text-muted-foreground mt-2">JPEG, PNG, or WebP. Max 2MB.</p>
                                        {progress && (
                                            <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                                                <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${progress.percentage}%` }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {errors.avatar && <p className="mt-2 text-sm text-red-500">{errors.avatar}</p>}
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                                    <Briefcase className="w-4 h-4 text-primary" />
                                    About / Bio
                                </label>
                                <textarea
                                    value={data.bio}
                                    onChange={(e) => setData('bio', e.target.value)}
                                    rows={4}
                                    className="w-full rounded-xl border border-border bg-background text-foreground px-4 py-3 shadow-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-lg focus:outline-none resize-none"
                                    placeholder="Tell potential clients about yourself and your experience..."
                                />
                                {errors.bio && <p className="mt-2 text-sm text-red-500">{errors.bio}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                                    <Phone className="w-4 h-4 text-primary" />
                                    Contact Phone
                                </label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full rounded-xl border border-border bg-background text-foreground px-4 py-3 shadow-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 hover:shadow-md focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-lg focus:outline-none"
                                    placeholder="+63 XXX XXX XXXX"
                                />
                                {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone}</p>}
                            </div>

                            {/* Service Types */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                                    <Building2 className="w-4 h-4 text-primary" />
                                    Property Types You Manage
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {availableServiceTypes.map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => toggleServiceType(type)}
                                            className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                                                data.service_types.includes(type)
                                                    ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/25 scale-105'
                                                    : 'bg-muted border border-border text-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-primary'
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                {errors.service_types && <p className="mt-2 text-sm text-red-500">{errors.service_types}</p>}
                            </div>

                            {/* Services */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                                    <Briefcase className="w-4 h-4 text-primary" />
                                    Services You Offer
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {availableServices.map((service) => (
                                        <label 
                                            key={service} 
                                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                                                data.services.includes(service)
                                                    ? 'border-primary/50 bg-primary/5'
                                                    : 'border-border hover:border-primary/30 hover:bg-primary/5'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={data.services.includes(service)}
                                                onChange={() => toggleService(service)}
                                                className="h-5 w-5 rounded-md border-2 border-border bg-background text-primary cursor-pointer transition-all duration-200 hover:border-primary/50 focus:ring-2 focus:ring-primary/20 checked:bg-primary checked:border-primary"
                                            />
                                            <span className="text-sm text-foreground">{service}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.services && <p className="mt-2 text-sm text-red-500">{errors.services}</p>}
                            </div>

                            {/* Location */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    Location
                                </label>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Province</label>
                                        <input
                                            type="text"
                                            value={data.province}
                                            onChange={(e) => setData('province', e.target.value)}
                                            className="w-full rounded-xl border border-border bg-background text-foreground px-4 py-2.5 shadow-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                            placeholder="e.g., Cebu"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">City</label>
                                        <input
                                            type="text"
                                            value={data.city}
                                            onChange={(e) => setData('city', e.target.value)}
                                            className="w-full rounded-xl border border-border bg-background text-foreground px-4 py-2.5 shadow-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                            placeholder="e.g., Cebu City"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Barangay</label>
                                        <input
                                            type="text"
                                            value={data.barangay}
                                            onChange={(e) => setData('barangay', e.target.value)}
                                            className="w-full rounded-xl border border-border bg-background text-foreground px-4 py-2.5 shadow-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                            placeholder="e.g., Lahug"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Address (Optional)</label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="w-full rounded-xl border border-border bg-background text-foreground px-4 py-2.5 shadow-sm transition-all duration-200 placeholder:text-muted-foreground hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                    placeholder="Street address"
                                />
                            </div>

                            {/* Service Radius */}
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                                    Service Radius (km)
                                </label>
                                <input
                                    type="number"
                                    value={data.service_radius_km}
                                    onChange={(e) => setData('service_radius_km', e.target.value)}
                                    min="1"
                                    max="100"
                                    className="w-32 rounded-xl border border-border bg-background text-foreground px-4 py-2.5 shadow-sm transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end pt-4 border-t border-border/50">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:ring-2 hover:ring-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
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
