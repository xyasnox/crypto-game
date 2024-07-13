import cn from 'classnames';
import React, { useContext } from 'react';

import AppContext, { AppContextType, Screens } from '../../context/AppContext';
import { FriendIcon, HomeIcon, TaskIcon } from '../../assets';

import './Menu.css';

const screenValues = Object.values(Screens);

const Icon: React.FC<{ value: Screens }> = ({ value }) => {
    switch (value) {
        case Screens.home:
            return <HomeIcon className="Menu-icon" />;
        case Screens.tasks:
            return <TaskIcon className="Menu-icon" />;
        case Screens.frens:
            return <FriendIcon className="Menu-icon" />;
    }
};

export const Menu: React.FC = () => {
    const { screen, setScreen } = useContext<AppContextType>(AppContext);

    return (
        <div className="Menu-container">
            {screenValues.map((value) => {
                return (
                    <div
                        key={value}
                        className={cn('Menu-element', value === screen && 'Menu-current')}
                        onClick={() => {
                            setScreen(value);
                        }}
                    >
                        <Icon value={value} />
                        {value}
                    </div>
                );
            })}
        </div>
    );
};
