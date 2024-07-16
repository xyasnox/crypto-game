import React, { Dispatch, SetStateAction } from 'react';

export type Toast = {
    value: React.ReactNode;
    type: 'error' | 'info';
} | null

export interface ToastContextType {
    toast: Toast;
    setToast: Dispatch<SetStateAction<Toast>>;
}

const ToastContext = React.createContext<ToastContextType>({ toast: null, setToast: () => null });

export default ToastContext;
