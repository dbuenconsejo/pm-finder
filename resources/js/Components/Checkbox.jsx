export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'h-5 w-5 rounded-md border-2 border-border bg-background text-primary ' +
                'shadow-sm cursor-pointer ' +
                'transition-all duration-200 ' +
                'hover:border-primary/50 hover:shadow-md ' +
                'focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background ' +
                'checked:bg-primary checked:border-primary ' +
                className
            }
        />
    );
}
