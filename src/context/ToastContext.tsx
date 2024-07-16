import React, { Dispatch, SetStateAction } from 'react';

export type Toast = {
    value: React.ReactNode;
} | null

export interface ToastContextValue {
    toast: Toast;
    setToast: Dispatch<SetStateAction<Toast>>;
}

const ToastContext = React.createContext<ToastContextValue>({ toast: null, setToast: () => null });

export default ToastContext;
