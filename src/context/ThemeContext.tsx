import React, { Dispatch, SetStateAction } from 'react';

export enum Themes {
    light = 'light',
    dark = 'dark',
}

export interface ThemeContextValue {
    theme: Themes;
    setTheme: Dispatch<SetStateAction<Themes>>;
}

export const themeConverter = (theme: WebApp['colorScheme']) => {
    switch (theme) {
        case Themes.light:
            return Themes.light;
        case Themes.dark:
            return Themes.dark;
        default:
            return Themes.light;
    }
};

const ThemeContext = React.createContext<ThemeContextValue>({
    theme: Themes.light,
    setTheme: () => null,
});


export default ThemeContext;
