const URL_GET_CATEGORIES = 'https://dummyjson.com/products/categories'
const URL_GET_CATEGORY = 'https://dummyjson.com/products/category/'

export const getCategories = async()=>{

    try {
        const response = await fetch(URL_GET_CATEGORIES)
        const categories = await response.json();
        return categories?.map(category=>({
            slug: category.slug,
            name: category.name,
            url: category.url
        }))
        
    } catch (error) {
        throw new Error('Error al obtener las categorias')
    }

}

export const fetchProductsByCategory = async({category, limit =null})=>{
    try {
        const url = limit !== null ? URL_GET_CATEGORY+category+'?limit='+limit :URL_GET_CATEGORY+ category;
        const response = await fetch(url)
        const categoryData = await response.json();
        return (categoryData ? {
            products: categoryData.products,
            category: categoryData.products[1].category
        }:{})
    } catch (error) {
        throw new Error('Error al obtener las categorias')
    }

}