import { getCategories, fetchProductsByCategory } from "../services/products";
import { useEffect, useState, useCallback } from "react";
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

export function useCategoriesData(categories) {
    const [error, setError] = useState(null);
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!categories || categories.length === 0) {
            setLoading(false);
            return;
        }

        const fetchData = useCallback(async () => {
            try {
                const dataPromises = categories.map(category => getProductsByCategory(category.slug, 4));
                const newCategoriesData = await Promise.all(dataPromises);
                setCategoriesData(newCategoriesData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        },[])

        fetchData();
    }, [categoriesData]); // Add categories as dependency

    return { categoriesData, error, loading };
}

export function useProductsByCategory(){
    const [error, setError] = useState(null)
    const [products, setProducts] = useState([])

    const getProductsByCategory = useCallback(async ({category}) => {
        try {
            const newProducts = await fetchProductsByCategory({category})
            setProducts(newProducts)
        } catch (error) {
            setError(error);
        }
      },[])

    return{ products: products, getProductsByCategory, error}
}