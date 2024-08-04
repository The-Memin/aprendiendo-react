import { navigate } from "../Link"
import { Link } from "../Link"

export default function HomePage() {
    return(
        <>
        <h1>Home</h1>
        <p>Esta es la pagina de home</p>
        <Link to='/about'>Ir a About</Link>
        </>
    )
}