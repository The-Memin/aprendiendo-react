import { Catalogue } from './components/Catalogue'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Cart } from './components/Cart'
import { IS_DEVELOPMENT } from './config'
import { CartProvider } from './context/cart'
import { useTheme } from './hooks/useTheme'


function App() {
    const {theme} = useTheme()
    
    return (
        <div className={`${theme === 'light' ? 'bg-light-background text-light-text' : 'bg-dark-background text-dark-text'} flex flex-col items-center transition ease-in min-h-screen  `}>
            <div className="w-full flex flex-col items-center">
                <CartProvider>
                    <Header/>
                    <Cart/>
                    <Catalogue/>
                    {IS_DEVELOPMENT && <Footer/>}
                </CartProvider>
            </div>
        </div>
    )
}

export default App
