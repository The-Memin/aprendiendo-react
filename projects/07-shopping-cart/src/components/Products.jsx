import { useCategories } from '../hooks/useProducts'
import { useEffect, useState } from "react"
import { useTheme } from '../hooks/useTheme.jsx';
import { useProductsByCategory } from '../hooks/useProducts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export function Products() {
    const {categories} = useCategories()
    const {theme} = useTheme()
    const [isCategorySelect, setIsCategorySelect] = useState(false);
    const [categorySelect, setCategorySelect] = useState('');
    const {products, getProductsByCategory} = useProductsByCategory();
    const [loading, setLoading] = useState(true);

    const handleClick = (event, index)=>{
        setIsCategorySelect(true)
        setCategorySelect(categories[index])
    }

    const handleReturn = (event) =>{
        setIsCategorySelect(false);
        setLoading(true);
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
    function formatAsPrice(number) {
        const formatter = new Intl.NumberFormat('es-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      
        return formatter.format(number);
      }
    return(
        <main className={`products max-w-screen-lg my-24 flex flex-col gap-20`}>
            <button onClick={handleReturn} className={`w-fit py-2 pl-4 pr-5 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${isCategorySelect?'block':'hidden'}`}>
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back
            </button>

            <div className='flex flex-col gap-14'>
                <h3 className='text-3xl capitalize' >{!isCategorySelect?'Categories': products.category}</h3>
                <ul className= {`${(theme === 'light')?'bg-light1':'bg-dark1'} ${isCategorySelect?'category':'bg-transparent'} transition`}>
                {
                    !isCategorySelect?
                    categories.map((category, index) =>{
                            return(<li key={index} onClick={(event)=>handleClick(event, index)}  className={`bg-light-background text-light-text font-bold text-center p-5 rounded-md cursor-pointer hover:scale-105 hover:bg-slate-200 ease-in transition shadow-sm ${theme!=='light'?'shadow-white':'shadow-slate-500'}`}>{category.name}</li>)
                    }):
                    loading ?
                        <li className="loader"></li>:
                        products.products.map(product =>{
                            return(
                                <li key={product.id} className='cursor-pointer flex gap-6 h-fit items-center w-5/6 border-b pb-2'>
                                    <img src={product.thumbnail} alt="" className='h-full max-h-44 object-contain'/>
                                    <div className="flex flex-col gap-2 h-full py-4">
                                        <h1 className="text-2xl italic">{product.title}</h1>
                                        <p className="flex gap-4 text-gray-400">{product.tags.map(tag => <span key={tag}>{tag}</span>)}</p>
                                        <p>{product.description}</p>
                                        <strong className="text-xl">{formatAsPrice(product.price)}</strong>
                                    </div>
                                </li>
                            )
                        })
                }
                </ul>
            </div>
        </main>
    )
}