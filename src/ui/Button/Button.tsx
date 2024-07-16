import cn from 'classnames';
import React, { PropsWithChildren } from 'react';

import './Button.css';
import { Loader } from '../Loader/Loader';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    reversed?: boolean;
    loading?: boolean;
}

export const Button: React.FC<Props> = ({ children, disabled, reversed, loading, className, ...props }) => {
    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={cn(
                'Button',
                (disabled || loading) && 'Button-disabled',
                reversed && 'Button-reverse',
                className,
            )}
        >
            {loading ? <Loader reversed={reversed} size="s" /> : children}
        </button>
    );
};

export const ButtonGroup: React.FunctionComponent<PropsWithChildren> = ({ children }) => (
    <div className="Button-group">{children}</div>
);
