import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'bg-[var(--layer-2)] text-amber-500'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--layer-2)] hover:text-amber-500') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}
