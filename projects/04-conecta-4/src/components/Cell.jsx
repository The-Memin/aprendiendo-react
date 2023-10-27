
export const Cell = ({cellClass, isSelected})=>{
    const className = `circle ${cellClass} ` ;
    const classNameCell = `cell ${isSelected ? 'is-selected': ''}` ;
    return (
        <div className= {classNameCell} >
            <div className={className}>

            </div>
        </div>
    )
}