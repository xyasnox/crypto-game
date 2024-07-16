import React, { Dispatch, SetStateAction } from 'react';

export enum Themes {
    light = 'light',
    dark = 'dark',
}

export interface ThemeContextValue {
    theme: Themes;
    setTheme: Dispatch<SetStateAction<Themes>>;
}

const ThemeContext = React.createContext<ThemeContextValue>({
    theme: Themes.light,
    setTheme: () => null,
});

export default ThemeContext;
