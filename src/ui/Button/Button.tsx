import cn from 'classnames';
import React from 'react';

import './Button.css';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return <button {...props} className={cn('Button', props.disabled && 'Button-disabled', props.className)} />;
};
