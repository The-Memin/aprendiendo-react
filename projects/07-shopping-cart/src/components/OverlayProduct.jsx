
import { useRef } from "react"
import StarRating from "./StarRating"
import { formatAsPrice } from "../logic/formatAsPrice"
import { CartButton } from "./CartButton.jsx";
import { useTheme } from "../hooks/useTheme.jsx";
import { Theme } from "../constants/themes.js";
export function OverlayProduct({productSelect, closeModal}) {
    const imgRef = useRef(null)
    const {theme} = useTheme()
    const changeImg = (event)=>{
        imgRef.current.src = event.target.src;
        const imgs = document.querySelectorAll('.img-small')
        imgs.forEach(img => img.classList.remove('border-sky-600'));
    }

    const setDimensions = (dimensions) => {
        return `( ${dimensions.width}cm x ${dimensions.height}cm x ${dimensions.depth}cm )`
    }

    const getOldPrice = (price, percentage) => {
        const pricePercentage = (100 - percentage) / 100;
        return formatAsPrice(price / pricePercentage)
    }

    return(
        <section className={`fixed w-full h-full left-0 top-0 bg-opacity-40 grid place-items-center
            ${theme === Theme.LIGHT ? 'bg-slate-200':'bg-stone-900'}
            `}>
                <div className={`flex flex-col lg:flex-row border items-stretch px-8 lg:pr-[5em] 2xl:px-10 2xl:pr-[7em] py-10 gap-10 2xl:gap-20 max-w-md md:max-w-screen-xl min-h-[60vh] h-[35rem] overflow-scroll md:overflow-hidden md:h-fit w-[90%] md:w-fit rounded-md relative
                    ${theme=== Theme.LIGHT?'bg-light-background border-neutral-300':'bg-dark-background border-neutral-500'}
                    `}>
                    <span onClick={closeModal} className={`cross-exit ${theme===Theme.LIGHT?'after:bg-darked before:bg-darked':'after:bg-white before:bg-white hover:after:bg-slate-300 hover:before:bg-slate-300'} absolute top-6 right-7`}></span>
    
                    <div className="flex flex-col-reverse items-center lg:items-start lg:flex-row gap-4">
                        <ul className="flex lg:flex-col gap-2 overflow-hidden">
                            {
                                productSelect.images.map((img, index)=>{
                                    return(
                                        <li key={`small+${index}`}  className="max-w-[3em] lg:max-w-[4.5em]">
                                            <img 
                                                onMouseEnter={changeImg} 
                                                onMouseLeave={(event)=>{
                                                    event.target.classList.add('border-sky-600');
                                                }} 
                                                className="img-small border border-neutral-500 rounded-md aspect-square object-contain hover:border-sky-600 hover:border-2 cursor-pointer p-1 min-w-[3em]" src={img}>
                                            </img>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="w-[10em] lg:min-w-[20em] lg:max-w-[22em] lg:w-[40vh] relative overflow-hidden">
                            <img ref={imgRef} src={productSelect.thumbnail} alt="" className="h-full w-full object-contain aspect-square "/>
                        </div>
                    </div>
    
                    <article className="h-full grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-neutral-400 text-sm">{productSelect.warrantyInformation}</span>
                            <h1 className="text-2xl font-semibold">{productSelect.title}</h1>
                            <StarRating rating = {productSelect.rating}/>
                        </div>
                        <div className="flex flex-col">
                            <s className="text-neutral-500 text-">{getOldPrice(productSelect.price, productSelect.discountPercentage)}</s>
                            <div className="flex gap-2">
                                <strong className="text-3xl font-light">{formatAsPrice(productSelect.price)}</strong>
                                <span className={` ${theme===Theme.LIGHT?'text-emerald-600':'text-emerald-200'}`}>{productSelect.discountPercentage}% OFF</span>
                            </div>
                            <span className={`${theme=== Theme.LIGHT? 'text-neutral-600':'text-neutral-300'}`}>{productSelect.returnPolicy}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>
                                <h1 className={`font-light ${theme===Theme.LIGHT?'text-neutral-600':'text-neutral-300'}`}>Dimensions</h1>
                                <span>{setDimensions(productSelect.dimensions)}</span>
                            </div>
                            <div>
                                <h1 className={`font-light ${theme===Theme.LIGHT?'text-neutral-600':'text-neutral-300'}`}>Weight</h1>
                                <span>{productSelect.weight} Lb</span>
                            </div>
                        </div>
                        <div>
                            <span className={` text-lg font-light ${theme === Theme.LIGHT? 'text-green-500':'text-green-300'}`}>{productSelect.shippingInformation}</span>
                        </div>
                        <div className='mt-4 flex flex-col gap-3'>
                            <CartButton product={productSelect}/>
                        </div>
                    </article>
                </div>
            </section>
    )
}

