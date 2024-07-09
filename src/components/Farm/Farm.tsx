import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../AppContext';
import { formatTimer, percentage } from '../../utils';
import { MS_IN_SECOND } from "../../constants";
import { FARM_TIME_MS } from "../../config";

import './Farm.css';

export const Farm: React.FC = () => {
    const {
        userInfo: { farmEndTimestamp },
    } = useContext(AppContext);

    const now = new Date().valueOf();

    const [value, setValue] = useState<number>(farmEndTimestamp || 0);
    const timeLeft = value - now;
    const timerLeft = formatTimer(timeLeft);
    const [isCollected, setCollected] = useState<boolean>(false);

    useEffect(() => {
        const timerID = setInterval(() => setValue((prevState) => --prevState), MS_IN_SECOND);

        console.log(farmEndTimestamp, now);

        return () => clearInterval(timerID);
    }, []);

    return (
        <div
            onClick={() => {
                if (!isCollected) {
                    setCollected(true);
                } else if (!timerLeft) {
                    setCollected(false);
                }
            }}
            style={{ '--filling': `${farmEndTimestamp ? percentage(timeLeft, FARM_TIME_MS) : 0}%` } as React.CSSProperties}
            className="Farm-container"
        >
            {timerLeft && `Farming: ${timerLeft}`}
            {!timerLeft && !isCollected && 'Collect'}
            {!timerLeft && isCollected && 'Start'}
        </div>
    );
};
