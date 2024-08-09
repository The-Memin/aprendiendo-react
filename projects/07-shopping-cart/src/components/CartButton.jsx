import { useCart } from "../hooks/useCart"
export function CartButton({index= -1, product}){
    const {addToCart, removeFromCart, cart} = useCart()
    const checkProductInCart = product => {
        return cart.some(item => item.id === product.id)
    }
    const isProductInCart = checkProductInCart(product)
    return(
        <button 
            onClick={() => {
                isProductInCart
                    ? removeFromCart(product)
                    : addToCart(product)
            }}
            data-index = {index} 
            className={`${!isProductInCart?'bg-slate-300 hover:bg-slate-500 text-slate-900 hover:text-slate-100':'border hover:border-slate-400 hover:text-slate-300'} w-full  md:w-1/5 min-w-fit pt-2 pb-1 px-3 font-mono font-medium rounded-md transition capitalize`}>{!isProductInCart ? 'Add to cart':'remove from cart'}
        </button>

    )
}