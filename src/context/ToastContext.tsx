import React, {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';
import ReactDOM from 'react-dom';

import { Toast } from '../ui/Toast/Toast';

export type ToastParams = React.ReactNode;

interface ToastContextType {
    triggerToast: Dispatch<SetStateAction<ToastParams>>;
}

interface ToastProviderProps extends PropsWithChildren {
    duration?: number;
}

const Portal: React.FC<PropsWithChildren> = ({ children }) => {
    const [container, setContainer] = useState<HTMLElement>();

    useEffect(() => {
        const container = document.createElement('div');
        document.body.appendChild(container);

        setContainer(container);

        return () => {
            document.body.removeChild(container);
        };
    }, []);

    return container ? ReactDOM.createPortal(children, container) : null;
};

const ToastContext = createContext<ToastContextType>({
    triggerToast: () => null,
});

export const ToastContextProvider: React.FC<ToastProviderProps> = ({ duration = 5000, children }) => {
    const [toast, setToast] = useState<ToastParams>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (toast) {
                setToast(null);
            }
        }, duration);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [toast, duration]);

    return (
        <ToastContext.Provider value={{ triggerToast: setToast }}>
            {children}
            <Portal>
                <Toast show={!!toast}>{toast}</Toast>
            </Portal>
        </ToastContext.Provider>
    );
};

export const useToastContext = () => useContext(ToastContext);
