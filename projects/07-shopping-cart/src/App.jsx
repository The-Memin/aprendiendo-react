import {products as initialProducts} from './mocks/products.json'
import { Products } from './components/Products'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Cart } from './components/Cart'
import { useFilters } from './hooks/useFilters'
import { IS_DEVELOPMENT } from './config'
import { CartProvider } from './context/cart'
import { useTheme } from './hooks/useTheme'


function App() {
    const {filters, filterProducts} = useFilters()
    const filteredProducts = filterProducts(initialProducts)
    const {theme, toggleTheme} = useTheme()
    
    return (
        <div className={`${theme === 'light' ? 'bg-light-background text-light-text' : 'bg-dark-background text-dark-text'} flex flex-col items-center transition ease-in min-h-screen  `}>
            <div className="w-full flex flex-col items-center">
                <CartProvider>
                    <Header/>
                    <Cart/>
                    <Products/>
                    {IS_DEVELOPMENT && <Footer/>}
                </CartProvider>
            </div>
        </div>
    )
}

export default App
