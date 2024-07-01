const APIURL = 'https://www.omdbapi.com/?apikey=3422021a&s=';
export const searchMovies = async({search})=>{
    if(search ==='') return null;

    try{
        const response = await fetch(`${APIURL+search}`)
        const json = await response.json();
        
        const movies = json.Search;
      
        return movies?.map(movie =>({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          image: movie.Poster
        }))
    } catch(e){
        throw new Error('Error searching movies');
    }
}