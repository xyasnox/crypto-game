import React, { useContext } from 'react';

import AppContext from '../../context/AppContext';

import './FriendList.css';
import { Button } from '../../ui';

export const FriendList: React.FC = () => {
    const { friends } = useContext(AppContext);

    return (
        <div className="Friend-container">
            <span className="Friend-title">
                {friends.length ? 'Frens' : 'Frens list is empty. Invite someone, huh?'}
            </span>
            {friends.map(({ id, name }) => (
                <div className="Friend-item" key={id}>
                    <span className="Friend-name">{name}</span>
                </div>
            ))}
            <Button onClick={() => {
                navigator.clipboard.writeText('link here').catch((error) => error);
            }} reversed>Invite</Button>
        </div>
    );
};
