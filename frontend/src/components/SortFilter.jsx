// Componente de un filtro para ordenar

import "../styles.css"

export default function SortFilter({sort, setSort}) {
    return (
        <div className="sorting">
            <h3>Sort by:</h3>
            <select
                value={sort}
                onChange={(e) => {setSort(e.target.value)}}>
                <option value={""}>Default</option>
                <option value={"asc"}>Ascendent</option>
                <option value={"desc"}>Descendent</option>
            </select>
        </div>        
    )
}