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
                'rounded-lg border-[var(--layer-3)] bg-[var(--layer-1)] text-[var(--text-primary)] shadow-sm focus:border-amber-500 focus:ring-amber-500 placeholder:text-[var(--text-tertiary)] ' +
                className
            }
            ref={localRef}
        />
    );
});
