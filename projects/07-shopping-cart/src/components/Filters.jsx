//import './Filters.css'
import { useId } from 'react'
import { useFilters } from '../hooks/useFilters'

export function Filters(){
    const {filters, setFilters} = useFilters();
    
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event)=>{
        setFilters(prevState =>({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) =>{
        setFilters(prevState =>({
            ...prevState,
            category: event.target.value
        }))
    }

    return(
        <section className="filters flex w-[100%] justify-between max-w-screen-lg">
             
             <div className='flex gap-4'>
                <label htmlFor="price">Price a partir de:</label>
                <input
                    type="range" 
                    id={minPriceFilterId} 
                    min='0'
                    max='1000'
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>$ {filters.minPrice}</span>
             </div>

             <div className='flex gap-4'>
                <label htmlFor={categoryFilterId}>Categoria:</label>
                <select className='text-slate-800' id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="laptops">Laptops</option>
                    <option value="motorcycle">Motocicletas</option>
                    <option value="mobile-accessories">Electronicos</option>
                    <option value="tops">Tops</option>
                    <option value="smartphones">Celulares</option>
                </select>
             </div>

        </section>
    )
}