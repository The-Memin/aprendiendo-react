import { createContext } from "react";
import { useCartReducer } from "../hooks/useCartReducer";
//Crear contexto
export const CartContext = createContext()

//Crear provider
export function CartProvider({ children }) {
    const {state, addToCart, removeFromCart, clearCart} = useCartReducer();

    return(
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}