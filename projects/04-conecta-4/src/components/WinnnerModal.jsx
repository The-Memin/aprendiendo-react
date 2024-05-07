import {Cell} from './Cell'

export function WinnerModal({winner, resetGame, circle}){
    if (winner === null) return null;
    const winnerText = winner === false ? 'Empate' : 'Ganó';

    return (
        <section className="winner">
            <div className="text">
                <h2>
                    {winnerText}
                </h2>

                <header className="win">
                    {winner && <Cell cell = {circle}></Cell>}
                </header>

                <footer>
                    <button onClick={resetGame} >Empezar de Nuevo</button>
                </footer>
            </div>
        </section>
    );
}