import './Cart.css'

import { useId } from 'react'
import { CartIcon ,ClearCartIcon, RemoveFromCartIcon } from './Icons.jsx'

export function Cart(){
    const cartCheckboxId = useId()

    return(
        <>
            <label htmlFor={cartCheckboxId} className="cart-button">
                <CartIcon/>
            </label>
            <input id={cartCheckboxId} type='checkbox' hidden/>

            <aside className="cart">
                <ul>
                    <li>
                        
                    </li>
                </ul>
            </aside>
        </>
    )
}