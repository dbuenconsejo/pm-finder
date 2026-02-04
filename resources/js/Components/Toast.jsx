import { useState, useEffect, createContext, useContext } from 'react';

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const InfoIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MessageIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
);

const CloseIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

function Toast({ id, message, type = 'info', sender, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 5000);

        return () => clearTimeout(timer);
    }, [id, onClose]);

    const icons = {
        success: <CheckIcon />,
        info: <InfoIcon />,
        message: <MessageIcon />,
    };

    const colors = {
        success: 'bg-green-500',
        info: 'bg-blue-500',
        message: 'bg-primary',
    };

    return (
        <div className="flex items-start gap-3 w-80 p-4 rounded-lg bg-[var(--layer-01)] border border-[border] shadow-xl animate-slide-in">
            <div className={`shrink-0 w-8 h-8 rounded-full ${colors[type]} flex items-center justify-center text-white`}>
                {icons[type]}
            </div>
            <div className="flex-1 min-w-0">
                {sender && (
                    <p className="text-sm font-semibold text-[foreground]">
                        New message from {sender}
                    </p>
                )}
                <p className="text-sm text-[muted-foreground] truncate">
                    {message}
                </p>
            </div>
            <button
                onClick={() => onClose(id)}
                className="shrink-0 p-1 rounded text-[var(--text-muted)] hover:text-[foreground] hover:bg-[var(--layer-02)] transition-colors"
            >
                <CloseIcon />
            </button>
        </div>
    );
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info', sender = null) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, sender }]);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={removeToast}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}
