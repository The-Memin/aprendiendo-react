import { useState } from 'react'
import { Column } from './components/Column'
import { Cell } from './components/Cell';
import { WinnerModal } from './components/WinnnerModal';
import { checkWinnerFrom } from './logic/board';
function App() {
    const TURNS = {
        RED: 0, 
        BLUE: 1
    }
    const [board, setBoard] = useState(()=>{
        return Array(7).fill(Array(6).fill(null));
    });
    const [turn, setTurn] = useState(TURNS.RED)
    // null: no hay ganador, false es un empate
    const [winner, setWinner] = useState(null);
    const [coordenadas,setCoordenadas ] = useState([null, null])
    const resetGame = () => {
        setBoard(Array(7).fill(Array(6).fill(null)));
        setTurn(TURNS.RED);
        setWinner(null);
    }
    const updateBoard = (column, index) => {
        
        const newColumn = [...column]
        const newBoard = [...board]
        const x = index;
        let y = 0;
        let flagTurn = false;
        for(let i = 0; i < newColumn.length ; i++){
            if (newColumn[i] === null) {
                newColumn[i] = turn;
                y = i;
                const newTurn = turn === TURNS.RED ? TURNS.BLUE : TURNS.RED;
                setTurn(newTurn);
                setCoordenadas([x,y])
                newBoard[index] = newColumn;
                setBoard(newBoard)
                flagTurn= true;
                break;
            }
        }
       
        if (!flagTurn) {
            alert('No se pueden realizar mas moviemientos en esta fila!')
        }

        // revisar si hay ganador 
        const newWinner = checkWinnerFrom(newBoard, x, y);
        console.log("")
        setWinner(newWinner);
    }
    return (
        <main className='game'>
            <div className="game__main">
                <h1>Connect 4</h1>
                <section className="board">
                    {
                        board.map((column, index)=>{
                            return (
                                <Column 
                                    key= {index} 
                                    index={index} 
                                    column = {column} 
                                    updateBoard={updateBoard}
                                    coordenadas = {coordenadas}
                                >
                                </Column> 
                            )
                        })
                    }
                </section>
            </div>
            
            <div className="game__aside">
                    <div className="game-turns">
                        <h1>Turno</h1>
                        <div className="game__turn">
                            <Cell isSelected={turn === TURNS.RED} cellClass = 'circle-red'></Cell>
                            <Cell isSelected={turn === TURNS.BLUE} cellClass = "circle-blue"></Cell>
                        </div>
                    </div>
                    <button onClick={resetGame} >Reset del juego</button>
            </div>
            <WinnerModal resetGame={resetGame} winner={winner} circle = {turn === TURNS.RED ? TURNS.BLUE : TURNS.RED} />
        </main>
    )
}

export default App
