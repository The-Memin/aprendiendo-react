const URL_GET_CATEGORIES = 'https://dummyjson.com/products/categories'

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
