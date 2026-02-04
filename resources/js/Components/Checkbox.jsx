export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-[var(--layer-3)] bg-[var(--layer-1)] text-amber-500 shadow-sm focus:ring-amber-500 ' +
                className
            }
        />
    );
}
