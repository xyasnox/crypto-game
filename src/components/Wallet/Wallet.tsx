import React from 'react';

import { WalletIcon } from '../../assets';

import './Wallet.css';

interface Props {
    address?: string;
}

export const Wallet: React.FC<Props> = ({ address }) => {
    return (
        <div className="Wallet-container">
            <WalletIcon className="Wallet-icon" />
            <span className="Wallet-text">{address ? address : 'Connect wallet'}</span>
        </div>
    );
};
