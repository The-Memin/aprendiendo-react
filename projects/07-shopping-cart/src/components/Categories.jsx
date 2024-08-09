import { useTheme } from "../hooks/useTheme"
import { Link } from "react-router-dom"
import {Theme} from "../constants/themes"
export function Categories({handleClick, categories}){
    const {theme} = useTheme()
    
    return(
        <main className={`products max-w-screen-lg my-24 flex flex-col gap-20 px-4 md:px-12 lg:px-0`}>

            <div className='flex flex-col gap-8 lg:gap-14'>
                <h3 className='text-3xl capitalize' >Categories</h3>
                <ul className= {`transition list-products gap-6 md:gap-x-6 md:gap-y-8 lg:gap-x-8 lg:gap-y-16`}>
                {
                    categories.map((category, index) =>{
                            return(
                                <Link key={index+'link'} to={`/products/${category.slug}`}>
                                    <li key={index}  className={`bg-light-background text-light-text font-bold text-center p-5 rounded-md cursor-pointer hover:scale-105 hover:bg-slate-200 ease-in transition shadow-sm ${theme!==Theme.LIGHT?'shadow-white':'shadow-slate-500'}`}>{category.name}</li>
                                </Link>
                            )
                    })       
                }
                </ul>
            </div>

        </main>
    )
}