import './Cart.css'
import { useTheme } from '../hooks/useTheme.jsx'
import { useEffect, useId, useRef, useState } from 'react'
import { CartIcon ,ClearCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.jsx'

export function CartItem({thumbnail, price, title, quantity, addToCart, discountFromCart}) {
    return(
        <li className='flex flex-col gap-3 items-center'>
            <img className='object-contain' src={thumbnail} alt={title} />
            <div className='flex flex-col gap-2 items-center'>
                <strong className='text-center'>{title}</strong> 
                ${price}
            </div>
            <footer>
                <button onClick={discountFromCart}>-</button>
                <small>Qty: {quantity}</small>
                <button onClick={addToCart}>+</button>
            </footer>
        </li>
    )
}

export function Cart(){
    const {theme} = useTheme()
    const cartCheckboxId = useId()
    const {cart, clearCart, addToCart, discountFromCart} = useCart()
    const [isChecked, setIsChecked] = useState(false);
    const hasMounted = useRef(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(()=>{
        if (!isChecked && hasMounted.current) {
            setIsChecked(preview => !preview)
        }else{
            hasMounted.current = true;
        }
    },[cart])


    return(
        <>
            <label htmlFor={cartCheckboxId} className="cart-button fixed top-20 lg:top-[1.1em]">
                <CartIcon/>
            </label>
            <input checked={isChecked} onChange={handleCheckboxChange} id={cartCheckboxId} type='checkbox' hidden/>

            <aside className={`cart items-center min-h-screen overflow-y-scroll border-l-2
                ${theme==='light'?'bg-slate-200 border-dark-background':'bg-dark-background border-lighted'}
                `}>
                <ul className='flex flex-col gap-2 items-center mb-3'>
                    {cart.length > 0 ? cart.map(product =>(
                        <CartItem
                            key={product.id}
                            addToCart={() => addToCart(product)}
                            discountFromCart = {() => discountFromCart(product)}
                            {...product}
                        />
                    )):
                    <h1 className='text-center font-semibold'>No products have been added to the cart yet.</h1>
                    }
                </ul>

                <button className='rounded-md p-1 bg-slate-600 hover:bg-slate-700' onClick={clearCart}>
                    <ClearCartIcon/>
                </button>
            </aside>
        </>
    )
}