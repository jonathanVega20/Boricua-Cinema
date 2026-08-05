// Componente sobre el filtro de buscar por 
// palabras claves

import "../styles.css";

export default function Search({value, onChange}) {
    return (
        <div className="search-input">
            <input type="text" 
                    id="search" 
                    placeholder="Search"
                    value={value}
                    onChange={evt => onChange(evt.target.value)}/>
                <button className="search-button">
                    <img src={new URL("../assets/lupa.png", import.meta.url).href} alt='Search'/>
                </button>
        </div>
    );
}