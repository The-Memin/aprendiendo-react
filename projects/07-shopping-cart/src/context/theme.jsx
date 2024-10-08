import { createContext, useState } from "react";

export const ThemeContext = createContext()

export function ThemeProvider({children}) {
    const [theme, setTheme ] = useState(localStorage.getItem("theme") || 'dark');

    return(
        <ThemeContext.Provider value={{
            theme,
            setTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}