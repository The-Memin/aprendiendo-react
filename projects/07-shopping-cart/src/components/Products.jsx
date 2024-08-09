import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Product } from './Product';
import { OverlayProduct } from './OverlayProduct';
import { useState } from 'react';

export function Products({categories}){
    const {name} = useParams()
    const {products, isLoading, error} = useFetch(name, categories)
    const [selectedProduct, setSelectedProduct] = useState(null);

    if (isLoading) {
        return(<h1>Loading</h1>)
    }
    if(error){
        return(<h1>El producto no existe</h1>)
    }
    
    const handleShowMore = (product)=>{
        setSelectedProduct(product)
    }

    const closeModal = () => {
        setSelectedProduct(null);
    };

    return(
        <main className={`products max-w-screen-lg my-20 flex flex-col gap-10 px-5 md:p-0`}>
            <Link to={'/'}>
                <button className={`w-fit py-2 pl-4 pr-5 bg-blue-500 text-white rounded hover:bg-blue-600 transition`}>
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back
                </button>
            </Link>
            
            <div className='flex flex-col gap-14'>
                <h3 className='text-3xl capitalize' >{name}</h3>
                <ul className='w-full flex flex-col items-center md:items-start gap-6 md:gap-0'>
                    {
                        products.map((product, index)=> <Product key={product.id} product={product} index={index} handleShowMore={handleShowMore}/>)
                    }
                </ul>
            </div>
            {
                selectedProduct && <OverlayProduct productSelect={selectedProduct} closeModal ={closeModal} />
            }
        </main>
    )
}