import React, { useContext } from 'react';

import AppContext from '../../context/AppContext';
import { useToastContext } from '../../context/ToastContext';
import { Button, ButtonGroup } from '../../ui';

import './FriendList.css';

export const FriendList: React.FC = () => {
    const { friends } = useContext(AppContext);

    const { triggerToast } = useToastContext();

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
            <ButtonGroup>
                <Button
                    onClick={() => {
                        navigator.clipboard.writeText('link here').catch((error) => error);
                    }}
                    reversed
                >
                    Invite
                </Button>
                Or
                <Button
                    onClick={() => {
                        navigator.clipboard.writeText('link here').catch((error) => error);
                        triggerToast('Link copied!');
                    }}
                    reversed
                >
                    Copy invite link
                </Button>
            </ButtonGroup>
        </div>
    );
};
