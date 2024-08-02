import cn from 'classnames';
import React, { useContext, useEffect, useState } from 'react';

import { claim } from '../../api';
import { MS_IN_SECOND } from '../../constants';
import { FARM_TIME_MS } from '../../config';
import AppContext, { AppContextType } from '../../context/AppContext';
import { useToastContext } from '../../context/ToastContext';
import { formatTimestamp, percentage } from '../../utils';

import './Farm.css';

export const Farm: React.FC = () => {
    const {
        userInfo: { farmEndTimestamp, userId },
        setUserInfo,
    } = useContext<AppContextType>(AppContext);
    const { triggerToast } = useToastContext();

    const now = new Date().valueOf();

    const [value, setValue] = useState<number>(farmEndTimestamp || 0);
    const timeLeft = value - now;
    const timerLeft = formatTimestamp(timeLeft);
    const [isCollected, setCollected] = useState<boolean>(false);

    useEffect(() => {
        const timerID = setInterval(() => setValue((prevState) => --prevState), MS_IN_SECOND);

        return () => clearInterval(timerID);
    }, []);

    return (
        <div
            onClick={() => {
                if (!isCollected && !timerLeft) {
                    claim({ userId, reward: 250 }).then(({ balance, claimed }) => {
                        setUserInfo((prevState) => ({
                            ...prevState,
                            balance,
                        }));
                        triggerToast(`Collected ${claimed}`);
                        setCollected(true);
                    });
                } else if (!timerLeft) {
                    // updateFarmTimestamp({ accountId }).then(({ farmEndTimestamp }) => {
                    //     setUserInfo((prevState) => ({
                    //         ...prevState,
                    //         farmEndTimestamp,
                    //     }));
                    //     setValue(farmEndTimestamp);
                    //     setCollected(false);
                    // });
                }
            }}
            style={
                { '--filling': `${farmEndTimestamp ? percentage(timeLeft, FARM_TIME_MS) : 0}%` } as React.CSSProperties
            }
            className={cn('Farm-container', !isCollected && !timerLeft && 'Farm-active')}
        >
            {timerLeft && `Farming: ${timerLeft}`}
            {!timerLeft && !isCollected && 'Collect'}
            {!timerLeft && isCollected && 'Start'}
        </div>
    );
};
