import React from 'react';

import './Loader.css';
import cn from 'classnames';

interface Props {
    reversed?: boolean;
    size?: 's' | 'm' | 'l';
}

export const Loader: React.FC<Props> = ({ reversed, size = 'l' }) => {
    return (
        <div className={cn('Loader', reversed && 'Loader-reversed', size && `Loader-${size}`)} />
    );
};
