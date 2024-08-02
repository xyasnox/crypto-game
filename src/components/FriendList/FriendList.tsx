import React, { useContext } from 'react';

import AppContext from '../../context/AppContext';
import { useToastContext } from '../../context/ToastContext';
import { Button, ButtonGroup } from '../../ui';

import './FriendList.css';

const TEXT: string =
    'LunarCoin: Your first crypto wealth. Join, share, and earn airdrops!\n🎁 +100k coin as a first-time gift';

export const FriendList: React.FC = () => {
    const {
        friends,
        userInfo: { userId },
    } = useContext(AppContext);

    const { triggerToast } = useToastContext();

    const friendUrl = `https://t.me/theLunarCoinBot/LunarCoin?invitedBy=${userId}`;

    return (
        <div className="Friend-container">
            <span className="Friend-title">
                {friends.length ? 'Frens' : 'Frens list is empty. Invite someone, huh?'}
            </span>
            {friends.map(({ accountId, name }) => (
                <div className="Friend-item" key={accountId}>
                    <span className="Friend-name">{name}</span>
                </div>
            ))}
            <ButtonGroup>
                <Button
                    onClick={() => {
                        window.Telegram.WebApp.openTelegramLink(
                            `https://t.me/share/url?url=${friendUrl}&text="${TEXT}"`,
                        );
                    }}
                    reversed
                >
                    Invite
                </Button>
                Or
                <Button
                    onClick={() => {
                        navigator.clipboard.writeText(friendUrl).catch((error) => error);
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
