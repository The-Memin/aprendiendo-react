import { useCart } from '../hooks/useCart'
import { useFilters } from '../hooks/useFilters'
import './Footer.css'

export function Footer(){
    const {filters} = useFilters()
    const {cart} = useCart()
    return( 
        <footer className="footer">
            {
                JSON.stringify(cart, null, 2)
            }
            {/* <h4>Prueba tecnica de React</h4>
            <span>@The-Memin</span>
            <h5>Shoping Cart con useContext & useReducer</h5> */}
        </footer>
    )
}