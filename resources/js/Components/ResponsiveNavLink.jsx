import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-amber-500 bg-amber-500/10 text-amber-500'
                    : 'border-transparent text-[var(--text-secondary)] hover:border-[var(--layer-3)] hover:bg-[var(--layer-2)] hover:text-[var(--text-primary)]'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
