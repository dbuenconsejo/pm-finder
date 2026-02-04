export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-sm font-semibold text-foreground mb-2 ` +
                `transition-colors duration-200 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
