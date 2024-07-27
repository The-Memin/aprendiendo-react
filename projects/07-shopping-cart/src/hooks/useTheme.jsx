import { useEffect, useContext } from "react";
import { ThemeContext } from "../context/theme";

export function useTheme() {
    const {theme, setTheme} = useContext(ThemeContext)

    useEffect(()=>{
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme)
        localStorage.setItem('theme', theme)
    })

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' :'light'))
    }

    return {theme, toggleTheme}
}