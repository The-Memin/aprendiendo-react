import { Theme } from "../constants/themes"
import { useTheme } from "../hooks/useTheme"
import { formatAsPrice } from "../logic/formatAsPrice"
import { CartButton} from "../components/CartButton"

export function Product({product, index, handleShowMore}){
    const {theme} = useTheme()

    const handleClick = ()=>{
        handleShowMore(product)
    }

    return(
        <li className={`flex flex-col md:flex-row gap-6 h-fit items-center w-full border p-5 rounded-md md:border-x-0 md:border-t-0 ${theme===Theme.LIGHT ? 'border-slate-300':'border-neutral-600'}`}>
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
                    <CartButton index={index} product={product} />
                    <button data-index = {index} onClick={handleClick} className='w-full md:w-1/5 min-w-fit border pt-2 pb-1 px-3 rounded-md capitalize hover:border-slate-400 hover:text-slate-300 transition'>More</button>
                </div>
            </div>
        </li>   
    )
}