import React, { useContext } from 'react';

import AppContext, { AppContextType } from '../../context/AppContext';

import './Balance.css';

export const Balance: React.FC = () => {
    const {
        userInfo: { balance },
    } = useContext<AppContextType>(AppContext);

    return (
        <div className="Balance-container">
            <span className="Balance-value">Balance: {balance}</span>
        </div>
    );
};
