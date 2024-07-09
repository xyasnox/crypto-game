import React, { useContext } from 'react';

import { AppContext } from '../../AppContext';

import './Balance.css';

export const Balance: React.FC = () => {
    const {
        userInfo: { balance },
    } = useContext(AppContext);

    return (
        <div className="Balance-container">
            <span className="Balance-value">Balance: {balance}</span>
        </div>
    );
};
