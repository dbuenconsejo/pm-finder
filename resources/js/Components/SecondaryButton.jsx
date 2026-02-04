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
                `inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground ` +
                `shadow-sm ` +
                `transition-all duration-300 ease-out ` +
                `hover:border-primary hover:bg-primary/5 hover:text-primary hover:shadow-md ` +
                `focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background ` +
                `disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card ` +
                (disabled ? 'opacity-50 cursor-not-allowed ' : '') +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
