import { createContext, useState } from "react";
//Crear contexto
export const CartContext = createContext()
//Crear provider
export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const addToCart = product => {
        // Check if the product is already in the cart
        const productIncartIndex = cart.findIndex(item => item.id === product.id)

        if (productIncartIndex >= 0) {
            const newCart = structuredClone(cart)
            newCart[productIncartIndex].quantity += 1
            return setCart(newCart)
        }

        //Producto no esta en el carrito
        setCart(prevState =>([
            ...prevState,
            {
                ...product,
                quantity: 1
            }
        ]))
    }

    const clearCart = () => {
        setCart([])
    }

    return(
        <CartContext.Provider value={{
            cart,
            addToCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}