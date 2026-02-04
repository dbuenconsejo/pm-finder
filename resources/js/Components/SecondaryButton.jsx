export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-lg border border-[var(--layer-3)] bg-[var(--layer-1)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] shadow-sm transition duration-150 ease-in-out hover:bg-[var(--layer-2)] hover:border-amber-500 hover:text-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
