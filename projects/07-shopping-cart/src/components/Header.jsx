import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../hooks/useTheme.jsx';
export function Header (){
    const {theme, toggleTheme} = useTheme()
    return(
        <header className='flex-col items-center gap-[2em] w-[100%] flex justify-center'>
            <div className={`flex w-[100%] justify-center ${(theme === 'light')?'bg-dark-background dark':'bg-light-background light'} py-2`}>
                <div className='flex max-w-screen-lg justify-between w-[100%] py-3 px-4 md:px-12 lg:px-0'>
                    <h1 className={`text-xl font-bold font-mono ${(theme === 'light')?'text-dark-text':'text-light-text'}`}>React shop</h1>
                    <div onClick={toggleTheme} className={`${(theme === 'light')?'bg-dark-background dark':'bg-light-background light'}  toggle-switch`}>
                        <FontAwesomeIcon icon={faSun} />
                        <FontAwesomeIcon icon={faMoon} />
                    </div>
                </div>
            </div>
        </header>
    )
}