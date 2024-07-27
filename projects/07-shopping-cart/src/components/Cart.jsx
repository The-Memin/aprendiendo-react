import './Cart.css'

import { useId } from 'react'
import { CartIcon ,ClearCartIcon, RemoveFromCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.jsx'

export function CartItem({thumbnail, price, title, quantity, addToCart}) {
    return(
        <li className='flex flex-col gap-3 items-center'>
            <img className='object-contain' src={thumbnail} alt={title} />
            <div className='flex flex-col gap-2 items-center'>
                <strong className='text-center'>{title}</strong> 
                ${price}
            </div>
            <footer>
                <small>Qty: {quantity}</small>
                <button onClick={addToCart}>+</button>
            </footer>
        </li>
    )
}

export function Cart(){
    const cartCheckboxId = useId()
    const {cart, clearCart, addToCart} = useCart()
    return(
        <>
            <label htmlFor={cartCheckboxId} className="cart-button">
                <CartIcon/>
            </label>
            <input id={cartCheckboxId} type='checkbox' hidden/>

            <aside className="cart items-center bg-dark-background border-l-2 border-lighted min-h-screen overflow-scroll">
                <ul className='flex flex-col items-center mb-3'>
                    {cart.map(product =>(
                        <CartItem
                            key={product.id}
                            addToCart={() => addToCart(product)}
                            {...product}
                        />
                    ))
                    }
                </ul>

                <button className='rounded-md p-1 bg-slate-600 hover:bg-slate-700' onClick={clearCart}>
                    <ClearCartIcon/>
                </button>
            </aside>
        </>
    )
}