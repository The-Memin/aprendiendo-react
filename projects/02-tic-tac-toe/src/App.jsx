import { useState } from "react"
import './App.css'
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'

function App() {
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board');
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
    });
    const [turn, setTurn] = useState(()=>{
        const turnFormStorage = window.localStorage.getItem('turn');
        return turnFormStorage ?? TURNS.X;
    });

    // null: no hay ganador, false es un empate
    const [winner, setWinner] = useState(null); 

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
        resetGameStorage();
    }

    const updateBoard = (index) =>{
        // No actualizamos posición si ya tiene algo
        if(board[index] || winner) return
        // Actualizar el tablero
        const newBoard = [...board];
        newBoard[index] = turn; 
        setBoard(newBoard);
        // Cambiar el turno
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);
        //guardar aqui partida
        saveGameToStorage({
            board: newBoard,
            turn: newTurn
        });
        // revisar si hay ganador 
        const newWinner = checkWinnerFrom(newBoard);

        if (newWinner) {
            confetti();
            setWinner(newWinner);
        } else if (checkEndGame(newBoard)){
            setWinner(false)  // empate
        }
    }

    return (
        <main className="board">
            <h1>Tic Tac Toe</h1>
            <button onClick={resetGame} >Reset del juego</button>
            <section className="game">
                {
                    board.map((square, index)=>{
                        return (
                            <Square
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {square}
                            </Square>
                        )
                    })
                }
            </section>

            <section className="turn">
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>

            <WinnerModal resetGame={resetGame} winner={winner} />
        </main>
    )
}

export default App
