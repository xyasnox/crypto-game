import React, { Dispatch, SetStateAction } from 'react';

export enum Themes {
    light = 'light',
    dark = 'dark',
}

export interface ContextValue {
    theme: Themes;
    setTheme: Dispatch<SetStateAction<Themes>>;
}

const ThemeContext = React.createContext<ContextValue>({
    theme: Themes.light,
    setTheme: () => null,
});

export default ThemeContext;
