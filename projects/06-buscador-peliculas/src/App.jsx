import './App.css'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import { Movies } from './components/Movies'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'

function App() {
  const [sort, setSort] = useState(false)
  const {search, updateSearch, error} = useSearch();
  const {movies, getMovies} = useMovies({search, sort });

  const debouncedGetMovies = useCallback(
    debounce(search =>{
      getMovies({search})
    },500)
  ,[])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search});
  }

  const handleSort = () => {
    setSort(!sort);
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }
 
  return (
    <div className='page'>

      <header className='header'>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input 
          onChange={handleChange} 
          value={search}
          name='query' 
          placeholder='Avengers, Star Wars, The Matrix' 
          type='text'
          style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }}
          />
          <button  type='submit'>Buscar</button>
          <div className="sort">
            <input type="checkbox" onChange={handleSort} checked={sort} name="sort" id="" />
            <span>Order by name</span>
          </div>
        </form>
        {error && <p style={{color: 'red'}} className='error'>{error}</p> }
      </header>

      <main>
        {
          <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
