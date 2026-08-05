// Componente para los diferentes filtros

import "../styles.css"

export default function Filter({heading, value, setValue, children}) {
    return (
        <div className="sorting">
            <h3>{heading}:</h3>
            <select
                value={value}
                onChange={(e) => {setValue(e.target.value)}}>
                {children}
            </select>
        </div>        
    )
}