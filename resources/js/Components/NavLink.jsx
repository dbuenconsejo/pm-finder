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
                'inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium ' +
                'transition-all duration-300 ease-out ' +
                'focus:outline-none focus:ring-2 focus:ring-primary/20 ' +
                (active
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-muted-foreground hover:bg-primary/5 hover:text-primary hover:shadow-sm') +
                ' ' + className
            }
        >
            {children}
        </Link>
    );
}
