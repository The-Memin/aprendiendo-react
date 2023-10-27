export const checkWinnerFrom = (boardToCheck)=>{
    
    if (checkColumn(boardToCheck) || checkRow(boardToCheck)) {
        return true;
    }else{
        return null;
    }
}

function checkColumn (board) {
    for (let columna = 0; columna < board.length; columna++) {
        const column = board[columna];
         
        for (let fila = 0; fila < column.length - 3; fila++) {
            if (column[fila] != '' && column[fila] === column[fila + 1] && column[fila] === column[fila + 2] && column[fila] === column[fila + 3]) {
                return true; // Se encontraron 4 elementos consecutivos iguales.
            }
        }
    }
    return false; // No se encontraron 4 elementos consecutivos iguales
}

function checkRow(board) {
    const column = board[0];
    
    for (let columna = 0; columna < board.length; columna++) {
        for (let row = 0; row < column.length -3; row++) {
            if (
                   board[columna][row] != '' 
                && board[columna][row] === board[columna+1][row]
                && board[columna][row] === board[columna+2][row]
                && board[columna][row] === board[columna+3][row]) {
                return true; // Se encontraron 4 elementos consecutivos iguales.
            }
        }
    }
    return false;  
}