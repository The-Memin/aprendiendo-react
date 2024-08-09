import { getCategories } from "../services/products";
import { useEffect, useState } from "react";

export function useCategories() {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null);
    useEffect(()=>{
        const categories = async()=>{
            try {
                const newCategories = await getCategories();
                setCategories(newCategories);
            } catch (error) {
                setError(error);
            }
        }
        categories();
    },[])

    return {categories: categories}
}