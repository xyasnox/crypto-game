import React, { useContext } from 'react';

import ThemeContext, { ThemeContextValue, Themes } from '../../context/ThemeContext';
import { MoonIcon, SunIcon } from '../../assets';

import './ThemeToggler.css';

const ThemeIcon: React.FC<{ value: Themes; onClick: () => void }> = ({ value, onClick }) => {
    switch (value) {
        case Themes.dark:
            return <MoonIcon onClick={onClick} className="Theme-icon" />;
        case Themes.light:
            return <SunIcon onClick={onClick} className="Theme-icon" />;
    }
};

export const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useContext<ThemeContextValue>(ThemeContext);

    return (
        <div className="Theme-container">
            <ThemeIcon
                value={theme}
                onClick={() => {
                    setTheme((prevState) => (prevState === Themes.dark ? Themes.light : Themes.dark));
                }}
            />
        </div>
    );
};
