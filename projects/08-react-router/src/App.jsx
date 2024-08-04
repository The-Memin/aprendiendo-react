import './App.css'
import { lazy, Suspense } from 'react'
import { Router } from './Router'
import { Route } from './Route'

const HomePage = lazy(()=>import('./pages/Home.jsx'))
const SearchPage = lazy(()=>import('./pages/Search.jsx'))
const AboutPage = lazy(()=>import('./pages/About.jsx'))

const appRoutes = [
    {
        path: '/',
        Component: HomePage
    },
    {
        path: '/about',
        Component: AboutPage
    },
    {
        path: '/search/:query',
        Component: SearchPage
    }
]


function App() {
    

    return (
        <main>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Router>
                    <Route path='/' Component={HomePage} />
                    <Route path= '/about' Component={AboutPage}/>
                </Router>
            </Suspense>
        </main>
    )
}

export default App
