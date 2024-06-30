 import { useState, useEffect } from 'react'
import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'

function App() {
  const {movies} = useMovies();
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(query)
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  useEffect(() => {

    if (query === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (query.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (query.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [query])

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} name='query' placeholder='Avengers, Star Wars, The Matrix' type='text'/>
          <button  type='submit'>Buscar</button>
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
