import cn from 'classnames';
import React from 'react';

import './Button.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    reversed?: boolean;
}

export const Button: React.FC<Props> = (props) => {
    return (
        <button
            {...props}
            className={cn(
                'Button',
                props.disabled && 'Button-disabled',
                props?.reversed && 'Button-reverse',
                props.className,
            )}
        />
    );
};
