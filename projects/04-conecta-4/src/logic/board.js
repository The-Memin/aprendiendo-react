export const checkWinnerFrom = (tablero, fila, columna)=>{
    const ficha = tablero[fila][columna];
    const alto = tablero.length;
    const ancho = tablero[0].length;

    // Definir las direcciones posibles para buscar combinaciones ganadoras
    const direcciones = [
        [0, 1],     // Horizontal
        [1, 0],     // Vertical
        [1, 1],     // Diagonal hacia arriba
        [1, -1]     // Diagonal hacia abajo
    ];

    // Función para verificar si hay una secuencia ganadora en una dirección específica
    function verificarSecuencia(dx, dy) {
        let count = 1; // Contador de fichas iguales consecutivas
        let x = columna + dx;
        let y = fila + dy;

        // Verificar hacia adelante desde la ficha colocada
        while (x >= 0 && x < ancho && y >= 0 && y < alto && tablero[y][x] === ficha) {
            count++;
            x += dx;
            y += dy;
        }

        // Verificar hacia atrás desde la ficha colocada
        x = columna - dx;
        y = fila - dy;
        while (x >= 0 && x < ancho && y >= 0 && y < alto && tablero[y][x] === ficha) {
            count++;
            x -= dx;
            y -= dy;
        }

        // Si hay 4 o más fichas iguales consecutivas en una dirección, hay un ganador
        return count >= 4;
    }

    // Verificar en cada dirección posible
    for (let [dx, dy] of direcciones) {
        if (verificarSecuencia(dx, dy)) {
            return true; // Hay un ganador
        }
    }

    // Si no se encontraron combinaciones ganadoras en ninguna dirección, no hay ganador
    return null;
}