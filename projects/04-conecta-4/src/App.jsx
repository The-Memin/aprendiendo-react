import { useState } from 'react'
import './App.css'
import { Column } from './components/Column'
import { Cell } from './components/Cell';
import { WinnerModal } from './components/WinnnerModal';
import { checkWinnerFrom } from './logic/board';
function App() {
    const TURNS = {
        RED: 'circle-red', 
        BLUE: 'circle-blue'
    }
    const [board, setBoard] = useState(()=>{
        return Array(7).fill(Array(6).fill(''));
    });
    const [turn, setTurn] = useState(()=>{
        return TURNS.RED;
    })
    // null: no hay ganador, false es un empate
    const [winner, setWinner] = useState(null);

    const resetGame = () => {
        setBoard(Array(7).fill(Array(6).fill('')));
        setTurn(TURNS.RED);
        setWinner(null);
    }
    const updateBoard = (column, index) => {
        const newColumn = [...column]
        const newBoard = [...board]
        for(let i = newColumn.length-1; i >= 0 ; i--){
            if (newColumn[i] === '') {
                newColumn[i] = turn;
                break;
            }
        }
        
        // Cambiar el turno
        const newTurn = turn === TURNS.RED ? TURNS.BLUE : TURNS.RED;
        setTurn(newTurn);
        
        newBoard[index] = newColumn;
        setBoard(newBoard)

        // revisar si hay ganador 
        const newWinner = checkWinnerFrom(newBoard);
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
                                <Column key= {index} index={index} column = {column} updateBoard={updateBoard}> </Column> 
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
