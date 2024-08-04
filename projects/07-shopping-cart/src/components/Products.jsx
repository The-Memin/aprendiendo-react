import { useCategories } from '../hooks/useProducts'
import { useEffect, useState } from "react"
import { useTheme } from '../hooks/useTheme.jsx';
import { useProductsByCategory } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart.jsx';
import { OverlayProduct } from './OverlayProduct.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { formatAsPrice } from '../logic/formatAsPrice.js';
import { CartButton } from './CartButton.jsx';
import { Theme } from '../constants/themes.js';

export function Products() {
    const {categories} = useCategories()
    const {theme} = useTheme()
    const [isCategorySelect, setIsCategorySelect] = useState(false);
    const [categorySelect, setCategorySelect] = useState('');
    const {products, getProductsByCategory} = useProductsByCategory();
    const [loading, setLoading] = useState(true);
    const [showMore, setShowMore] = useState(false);
    const [productSelect, setProductSelect] = useState({})
    const {cart} = useCart()

    const handleClick = (event, index)=>{
        setIsCategorySelect(true)
        setCategorySelect(categories[index])
    }

    const handleReturn = (event) =>{
        setIsCategorySelect(false);
        setLoading(true);
    }

    const checkProductInCart = product => {
        return cart.some(item => item.id === product.id)
    }

    const handleShowMore = (event) => {
        const indexProduct = event.target.dataset.index; 
        
        if (indexProduct) {
            setProductSelect(products.products[indexProduct])
        }

        setShowMore(preview => !preview)
    }

    useEffect(() => {
        const fetchProducts = async () => {
            if (categorySelect) {
                await getProductsByCategory({ category: categorySelect.slug });
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categorySelect]);

    return(
        <main className={`products max-w-screen-lg my-24 flex flex-col gap-20 px-4 md:px-12 lg:px-0`}>
            <button onClick={handleReturn} className={`w-fit py-2 pl-4 pr-5 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${isCategorySelect?'block':'hidden'}`}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back
            </button>

            <div className='flex flex-col gap-8 lg:gap-14'>
                <h3 className='text-3xl capitalize' >{!isCategorySelect?'Categories': products.category}</h3>
                <ul className= {`${(theme === Theme.LIGHT)?'bg-light1':'bg-dark1'} ${isCategorySelect?'category':'bg-transparent'} transition list-products gap-6 md:gap-x-6 md:gap-y-8 lg:gap-x-8 lg:gap-y-16`}>
                {
                    !isCategorySelect?
                    categories.map((category, index) =>{
                            return(<li key={index} onClick={(event)=>handleClick(event, index)}  className={`bg-light-background text-light-text font-bold text-center p-5 rounded-md cursor-pointer hover:scale-105 hover:bg-slate-200 ease-in transition shadow-sm ${theme!==Theme.LIGHT?'shadow-white':'shadow-slate-500'}`}>{category.name}</li>)
                    }):
                    loading ?
                        <li key='-1' className="loader"></li>:
                        products.products.map((product, index )=>{
                            const isProductInCart = checkProductInCart(product)
                            return(
                                <li key={product.id} className={`flex flex-col md:flex-row gap-6 h-fit items-center w-5/6 border p-5 rounded-md md:border-x-0 md:border-t-0 ${theme===Theme.LIGHT ? 'border-slate-300':'border-neutral-600'}`}>
                                    <img src={product.thumbnail} alt="" className='h-full max-h-44 object-contain'/>
                                    <div className="flex flex-col gap-2 h-full py-4 w-full">
                                        <header className='flex flex-col'>
                                            <h1 className="text-lg md:text-xl lg:text-2xl italic">{product.title}</h1>
                                            <span className={`text-[11px] md:text-xs ${product.availabilityStatus === 'In Stock' ? 'text-emerald-500':'text-red-500'}`}>{product.availabilityStatus}</span>
                                            <p className="text-xs lg:text-sm flex gap-4 text-gray-400">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</p>
                                        </header>
                                        <p className='text-sm lg:text-base hidden md:block'>{product.description}</p>
                                        <strong className="text-lg lg:text-xl">{formatAsPrice(product.price)}</strong>

                                        <div className='mt-4 flex flex-col md:flex-row gap-3 md:gap-6'>
                                            <CartButton index={index} product={product} isProductInCart={isProductInCart}/>
                                            <button data-index = {index} onClick={handleShowMore} className='w-full md:w-1/5 min-w-fit border pt-2 pb-1 px-3 rounded-md capitalize hover:border-slate-400 hover:text-slate-300 transition'>More</button>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                }
                </ul>
            </div>
            {
                isCategorySelect && showMore && <OverlayProduct productSelect={productSelect} handleShowMore= {handleShowMore} isProductInCart = {checkProductInCart(productSelect)}/>
            }

        </main>
    )
}