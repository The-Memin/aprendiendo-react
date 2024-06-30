import { useEffect, useState } from "react";
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/says/';
export function useCatImage({fact}){
    const [imageUrl, setImageUrl] = useState()
    useEffect(()=>{
        if(!fact) return;
        const threefirstWord = fact.split(' ', 3).join(' ');
        setImageUrl(`${CAT_PREFIX_IMAGE_URL+threefirstWord}?fontSize=50&fontColor=white`)
    },[fact])
    return {imageUrl}
}