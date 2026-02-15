import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { 
    ArrowLeft, ShieldCheck, UserCheck, XCircle, FileText, CheckCircle2, 
    Clock, AlertCircle, MapPin, Phone, Building2, ExternalLink, Eye,
    Star, Briefcase
} from 'lucide-react';

export default function VerificationReview({ propertyManager }) {
    const [showRejectForm, setShowRejectForm] = useState(false);
    const { data, setData, post, processing } = useForm({
        notes: '',
    });

    const handleApprove = () => {
        if (confirm('Approve this property manager and grant verified status?')) {
            router.post(route('admin.verify', propertyManager.id));
        }
    };

    const handleReject = (e) => {
        e.preventDefault();
        post(route('admin.reject', propertyManager.id));
    };

    const handleDocumentAction = (docId, status, notes = '') => {
        router.post(route('admin.review-document', docId), {
            status,
            admin_notes: notes,
        });
    };

    const [docNotes, setDocNotes] = useState({});

    const documentTypeLabels = {
        government_id: 'Government-Issued ID',
        business_permit: 'Business Permit / License',
        certification: 'Professional Certification',
        proof_of_address: 'Proof of Address',
        other: 'Other Supporting Document',
    };

    const docStatusConfig = {
        pending: { label: 'Pending', color: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30', icon: Clock },
        approved: { label: 'Approved', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30', icon: CheckCircle2 },
        rejected: { label: 'Rejected', color: 'text-red-600 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30', icon: XCircle },
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('admin.verification-queue')}
                        className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-accent/80 transition-all duration-200"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">Verification Review</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Review documents for {propertyManager.business_name || propertyManager.user?.name}
                        </p>
                    </div>
                </div>
            }
        >
            <Head title={`Review - ${propertyManager.business_name || propertyManager.user?.name}`} />

            <div className="py-8">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* PM Profile Summary */}
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />
                        
                        <div className="p-6 sm:p-8">
                            <div className="flex items-start gap-6">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="h-20 w-20 rounded-2xl border-2 border-primary/30 overflow-hidden">
                                        {propertyManager.avatar_url ? (
                                            <img src={propertyManager.avatar_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                                                <span className="text-3xl font-bold text-primary">
                                                    {propertyManager.business_name?.[0] || propertyManager.user?.name?.[0] || 'P'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-foreground">
                                            {propertyManager.business_name || propertyManager.user?.name}
                                        </h3>
                                        {propertyManager.is_verified && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border border-emerald-200 dark:border-emerald-500/30">
                                                <ShieldCheck className="w-3 h-3" />
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4" />
                                            {propertyManager.phone || 'No phone'}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            {propertyManager.city}{propertyManager.city && propertyManager.province ? ', ' : ''}{propertyManager.province || 'No location'}
                                        </div>
                                        {propertyManager.user?.email && (
                                            <div className="flex items-center gap-2">
                                                <span>✉️</span>
                                                {propertyManager.user.email}
                                            </div>
                                        )}
                                        {propertyManager.service_types && propertyManager.service_types.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <Building2 className="w-4 h-4" />
                                                {propertyManager.service_types.join(', ')}
                                            </div>
                                        )}
                                    </div>

                                    {propertyManager.bio && (
                                        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{propertyManager.bio}</p>
                                    )}
                                </div>

                                {/* View Full Profile Link */}
                                <Link
                                    href={route('property-managers.show', propertyManager.id)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 flex-shrink-0"
                                >
                                    <Eye className="w-4 h-4" />
                                    Full Profile
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Documents Review Section */}
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500" />
                        
                        <div className="p-6 sm:p-8">
                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
                                <FileText className="w-5 h-5 text-amber-500" />
                                Submitted Documents
                                <span className="text-sm font-normal text-muted-foreground">
                                    ({propertyManager.verification_documents?.length || 0} document{(propertyManager.verification_documents?.length || 0) !== 1 ? 's' : ''})
                                </span>
                            </h3>

                            {propertyManager.verification_documents && propertyManager.verification_documents.length > 0 ? (
                                <div className="space-y-4">
                                    {propertyManager.verification_documents.map((doc) => {
                                        const status = docStatusConfig[doc.status] || docStatusConfig.pending;
                                        const StatusIcon = status.icon;

                                        return (
                                            <div key={doc.id} className={`rounded-xl border p-5 ${status.color.split(' ').slice(1).join(' ')}`}>
                                                <div className="flex items-start gap-4">
                                                    {/* Document Preview */}
                                                    <div className="flex-shrink-0">
                                                        {doc.is_image && doc.file_url ? (
                                                            <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="block">
                                                                <img
                                                                    src={doc.file_url}
                                                                    alt={doc.document_name}
                                                                    className="w-32 h-24 object-cover rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                                                />
                                                            </a>
                                                        ) : (
                                                            <a
                                                                href={doc.file_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="w-32 h-24 rounded-lg border border-border bg-background flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
                                                            >
                                                                <FileText className="w-8 h-8 text-muted-foreground" />
                                                                <span className="text-xs text-muted-foreground">PDF</span>
                                                            </a>
                                                        )}
                                                    </div>

                                                    {/* Document Info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h4 className="font-semibold text-foreground">{doc.document_name}</h4>
                                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color.split(' ').slice(0, 1).join(' ')} ${status.color.split(' ').slice(1, 3).join(' ')}`}>
                                                                <StatusIcon className="w-3 h-3" />
                                                                {status.label}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mb-2">
                                                            Type: {documentTypeLabels[doc.document_type] || doc.document_type}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            Uploaded: {new Date(doc.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                        {doc.admin_notes && (
                                                            <p className="text-sm text-muted-foreground mt-2 italic">
                                                                Admin note: {doc.admin_notes}
                                                            </p>
                                                        )}
                                                        {doc.reviewer && (
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                Reviewed by {doc.reviewer.name} on {new Date(doc.reviewed_at).toLocaleDateString()}
                                                            </p>
                                                        )}

                                                        {/* Per-document Actions (only for pending docs) */}
                                                        {doc.status === 'pending' && (
                                                            <div className="mt-3 space-y-2">
                                                                <div className="flex items-center gap-2">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Optional note..."
                                                                        value={docNotes[doc.id] || ''}
                                                                        onChange={(e) => setDocNotes(prev => ({ ...prev, [doc.id]: e.target.value }))}
                                                                        className="flex-1 rounded-lg border border-border bg-background text-foreground px-3 py-1.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none"
                                                                    />
                                                                    <button
                                                                        onClick={() => handleDocumentAction(doc.id, 'approved', docNotes[doc.id])}
                                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                                                                    >
                                                                        <CheckCircle2 className="w-3 h-3" />
                                                                        Approve
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDocumentAction(doc.id, 'rejected', docNotes[doc.id])}
                                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                                                                    >
                                                                        <XCircle className="w-3 h-3" />
                                                                        Reject
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* View Full Size */}
                                                    {doc.file_url && (
                                                        <a
                                                            href={doc.file_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors flex-shrink-0"
                                                            title="Open in new tab"
                                                        >
                                                            <ExternalLink className="w-5 h-5" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12 rounded-xl border border-dashed border-border/50">
                                    <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                                    <p className="text-muted-foreground">No documents submitted yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Approval / Rejection Actions */}
                    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500" />
                        
                        <div className="p-6 sm:p-8">
                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                Verification Decision
                            </h3>

                            {!showRejectForm ? (
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleApprove}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:ring-2 hover:ring-emerald-500/30 transition-all duration-200"
                                    >
                                        <UserCheck className="w-5 h-5" />
                                        Approve & Verify
                                    </button>
                                    <button
                                        onClick={() => setShowRejectForm(true)}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border-2 border-red-300 dark:border-red-500/30 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        Reject
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleReject} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">
                                            Rejection Reason
                                        </label>
                                        <textarea
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            rows={3}
                                            required
                                            className="w-full rounded-xl border border-red-200 dark:border-red-500/30 bg-background text-foreground px-4 py-3 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none resize-none"
                                            placeholder="Explain why the verification is being rejected. This feedback will be shown to the property manager..."
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="submit"
                                            disabled={processing || !data.notes.trim()}
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-red-500 text-white shadow-lg shadow-red-500/25 hover:bg-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <XCircle className="w-5 h-5" />
                                            {processing ? 'Rejecting...' : 'Confirm Rejection'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowRejectForm(false)}
                                            className="px-6 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
