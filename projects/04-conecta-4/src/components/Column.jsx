import { Cell } from './Cell'

export const Column = ({index, column, updateBoard})=>{
    const handleClick = () => {
        updateBoard(column, index);
    }

    return (
        <div className="column" onClick={handleClick}>
            {
                column.map((cell, index)=>{
                    return(
                        <Cell key={index} cellClass = {cell}></Cell>
                    )
                })
            }
        </div>
    )
}