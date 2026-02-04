import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full rounded-xl border border-border bg-background text-foreground px-4 py-2.5 shadow-sm transition-all duration-200 ' +
                'placeholder:text-muted-foreground ' +
                'hover:border-primary/50 hover:shadow-md ' +
                'focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-lg focus:outline-none ' +
                'disabled:opacity-50 disabled:cursor-not-allowed ' +
                className
            }
            ref={localRef}
        />
    );
});
