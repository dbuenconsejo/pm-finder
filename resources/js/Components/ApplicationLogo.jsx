export default function ApplicationLogo({ className = '' }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {/* Icon */}
            <div className="relative">
                <svg 
                    viewBox="0 0 40 40" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-9 h-9"
                >
                    {/* Building/House shape */}
                    <rect x="4" y="16" width="32" height="20" rx="2" fill="url(#gradient1)" />
                    <path d="M20 4L38 16H2L20 4Z" fill="url(#gradient1)" />
                    
                    {/* Windows */}
                    <rect x="8" y="20" width="6" height="6" rx="1" fill="#0a0e14" fillOpacity="0.3" />
                    <rect x="17" y="20" width="6" height="6" rx="1" fill="#0a0e14" fillOpacity="0.3" />
                    <rect x="26" y="20" width="6" height="6" rx="1" fill="#0a0e14" fillOpacity="0.3" />
                    
                    {/* Door */}
                    <rect x="16" y="28" width="8" height="8" rx="1" fill="#0a0e14" fillOpacity="0.3" />
                    
                    {/* Search magnifier overlay */}
                    <circle cx="30" cy="28" r="7" stroke="#ffffff" strokeWidth="2" fill="none" />
                    <line x1="35" y1="33" x2="38" y2="36" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    
                    <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F5A623" />
                            <stop offset="100%" stopColor="#E59400" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            
            {/* Text */}
            <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-[var(--text-primary)]">
                    PM<span className="text-amber-500">Finder</span>
                </span>
            </div>
        </div>
    );
}
