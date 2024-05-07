import { Cell } from './Cell'
import { useEffect } from 'react';
import gsap from 'gsap';
export const Column = ({index, column, updateBoard, coordenadas})=>{
    
    const handleClick = () => {
        updateBoard(column, index);
    }

    useEffect(() => {
        const newCircle = document.querySelector('.new-circle');
        if (newCircle) {
            gsap.from(newCircle, { y: -300, duration: 1, ease: 'bounce.out' });
            newCircle.classList.remove('new-circle');
        }
    }, coordenadas)

    return (
        <div className="column" onClick={handleClick}>
            {
                column.map((cell, y)=>{
                    
                    const isNew = (index==coordenadas[0] && y == coordenadas[1])
                    return(
                        <Cell key={y} cell={cell}  isNew={isNew}></Cell>
                    )
                })
            }
        </div>
    )
}