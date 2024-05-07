
export const Cell = ({cell, isSelected, cellClass='', isNew= false})=>{

    return (
        <div  className = {`cell ${(isSelected)?'is-selected':''}`} >
            <div className={`circle ${cell==0? 'circle-red':cell==1?'circle-blue':''} ${cellClass} ${isNew?'new-circle':''}`}>

            </div>
        </div>
    )
}