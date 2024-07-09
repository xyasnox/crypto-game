import React from 'react';

import { WalletIcon } from '../../assets';

import './Wallet.css';

export const Wallet: React.FC = () => {
    return (
        <div className="Wallet-container">
            <WalletIcon className="Wallet-icon" />
            <span className="Wallet-text">wallet blah-blah</span>
        </div>
    );
};
