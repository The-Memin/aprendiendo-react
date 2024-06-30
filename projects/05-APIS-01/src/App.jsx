import { useCatFat } from "./hooks/useCatFact.js";
import { useCatImage} from "./hooks/useCatImage.js";
import '../App.css'

export function App () {
    const {fact, refreshRandomFact} = useCatFat();
    const {imageUrl} = useCatImage({fact})
    const handleClick = async () =>{
        refreshRandomFact()
    }

    return(
        <main>
            <h1>App de gatitos</h1>

            <button onClick = {handleClick}>Get new fact</button>

            {fact && <p>{fact}</p>}
            {true && <img src={imageUrl} alt={`image extracted using the first three words for ${fact}`} /> }
        </main>
    )

}