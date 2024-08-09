import { useState, useEffect } from 'react';

export const useFetch = (nameProduct, categories) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    if (url === null) {
        categories.forEach(categorie => {
            if (categorie.slug === nameProduct) {
               setUrl(categorie.url) 
            }
        });
    }
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();
    }, [url]);

    return { products: data ? data.products :null, isLoading, error };
};
