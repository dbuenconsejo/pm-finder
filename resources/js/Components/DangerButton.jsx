export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white ` +
                `bg-gradient-to-r from-red-500 to-rose-600 ` +
                `shadow-lg shadow-red-500/25 ` +
                `transition-all duration-300 ease-out ` +
                `hover:shadow-xl hover:shadow-red-500/40 hover:ring-2 hover:ring-red-500/30 hover:ring-offset-1 hover:ring-offset-background ` +
                `focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-background ` +
                `active:shadow-md ` +
                `disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:ring-0 ` +
                (disabled ? 'opacity-50 cursor-not-allowed ' : '') +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
