import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Building2, Phone, MapPin, Briefcase, User, Camera, X, Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { useState, useRef } from 'react';

export default function PropertyManagerEdit({ propertyManager }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        _method: 'PUT',
        business_name: propertyManager.business_name || '',
        bio: propertyManager.bio || '',
        phone: propertyManager.phone || '',
        avatar: null,
        remove_avatar: false,
        services: propertyManager.services || [],
        service_types: propertyManager.service_types || [],
        address: propertyManager.address || '',
        city: propertyManager.city || '',
        province: propertyManager.province || '',
        barangay: propertyManager.barangay || '',
        service_radius_km: propertyManager.service_radius_km || 10,
        is_available: propertyManager.is_available ?? true,
    });

    const [avatarPreview, setAvatarPreview] = useState(propertyManager.avatar_url || null);
    const avatarInputRef = useRef(null);
    const galleryInputRef = useRef(null);
    const [galleryUploading, setGalleryUploading] = useState(false);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            setData('remove_avatar', false);
            const reader = new FileReader();
            reader.onload = (e) => setAvatarPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const removeAvatar = () => {
        setData('avatar', null);
        setData('remove_avatar', true);
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
        post(route('property-managers.update', propertyManager.id), {
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

    const handleGalleryUpload = (e) => {
        const files = e.target.files;
        if (!files.length) return;

        setGalleryUploading(true);
        const formData = new FormData();
        Array.from(files).forEach((file, i) => {
            formData.append(`images[${i}]`, file);
        });

        router.post(route('property-managers.gallery.upload', propertyManager.id), formData, {
            forceFormData: true,
            onFinish: () => {
                setGalleryUploading(false);
                if (galleryInputRef.current) galleryInputRef.current.value = '';
            },
        });
    };

    const handleDeleteGalleryImage = (imageId) => {
        if (confirm('Remove this image?')) {
            router.delete(route('property-managers.gallery.delete', [propertyManager.id, imageId]));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Edit Profile</h2>
                    <p className="text-sm text-muted-foreground mt-1">Update your professional profile and portfolio</p>
                </div>
            }
        >
            <Head title="Edit PM Profile" />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Main Profile Form */}
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />
                        
                        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
                            {/* Availability Toggle */}
                            <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/30">
                                <div>
                                    <h3 className="font-semibold text-foreground">Availability</h3>
                                    <p className="text-sm text-muted-foreground">Toggle whether you appear in search results</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setData('is_available', !data.is_available)}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                                        data.is_available ? 'bg-gradient-to-r from-primary to-purple-600' : 'bg-border'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
                                            data.is_available ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
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
                                                    alt="Profile" 
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

                            {/* Business Name */}
                            <div>
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

                                {/* Address */}
                                <div className="mt-4">
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
                                <div className="mt-4">
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
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end pt-4 border-t border-border/50">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-purple-600 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:ring-2 hover:ring-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Gallery Section */}
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
                        
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                        <ImageIcon className="w-5 h-5 text-primary" />
                                        Gallery
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Showcase your work with up to 20 images
                                        {propertyManager.gallery_images && ` (${propertyManager.gallery_images.length}/20)`}
                                    </p>
                                </div>
                                <div>
                                    <input
                                        ref={galleryInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        multiple
                                        onChange={handleGalleryUpload}
                                        className="hidden"
                                        id="gallery-upload"
                                    />
                                    <label
                                        htmlFor="gallery-upload"
                                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 ${
                                            galleryUploading 
                                                ? 'bg-muted text-muted-foreground cursor-wait' 
                                                : 'border border-border text-foreground hover:border-primary/50 hover:bg-primary/5'
                                        }`}
                                    >
                                        <Upload className="w-4 h-4" />
                                        {galleryUploading ? 'Uploading...' : 'Add Images'}
                                    </label>
                                </div>
                            </div>

                            {/* Gallery Grid */}
                            {propertyManager.gallery_images && propertyManager.gallery_images.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {propertyManager.gallery_images.map((image) => (
                                        <div key={image.id} className="group relative aspect-square rounded-xl overflow-hidden border border-border/50">
                                            <img
                                                src={`/storage/${image.image_path}`}
                                                alt={image.caption || 'Gallery image'}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteGalleryImage(image.id)}
                                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 shadow-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            {image.caption && (
                                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <p className="text-xs text-white truncate">{image.caption}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 rounded-xl border border-dashed border-border/50">
                                    <ImageIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                                    <p className="text-muted-foreground">No gallery images yet.</p>
                                    <p className="text-sm text-muted-foreground/70 mt-1">Upload images to showcase your properties and work.</p>
                                </div>
                            )}
                            {errors.images && <p className="mt-4 text-sm text-red-500">{errors.images}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
