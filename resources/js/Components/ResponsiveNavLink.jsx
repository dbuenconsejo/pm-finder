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
            className={`flex w-full items-center gap-3 border-l-4 py-3 pe-4 ps-4 ${
                active
                    ? 'border-primary bg-primary/10 text-primary font-semibold'
                    : 'border-transparent text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground hover:pl-5'
            } text-base font-medium transition-all duration-300 ease-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
