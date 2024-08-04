import { navigate } from "../Link"
import { Link } from "../Link"
export default function AboutPage(){
    return(
        <>
            <h1>About</h1>
            <img src="https://avatars.githubusercontent.com/u/61178024?v=4" alt="" />
            <p>Hola me llamo memo</p>
            <Link to='/'>Ir a la home</Link>
        </>
    )
}