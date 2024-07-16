import cn from 'classnames';
import React from 'react';

import './Toast.css';

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    show: boolean;
    icon?: React.FC<React.SVGAttributes<SVGElement>>;
}

export const Toast: React.FC<Props> = ({ show, icon: Icon, className, children }) => {
    if (!children || !show) return null;

    return (
        <div className="Toast-container">
            <div className={cn('Toast-item', className)}>
                {Icon && <Icon className="Toast-icon" />}
                {children}
            </div>
        </div>
    );
};
