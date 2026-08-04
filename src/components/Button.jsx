// Este componente permite crear un boton
// props: nombre del boton, nombre de la clase, accion que tomara
import "../styles.css"

export default function Button({text, 
                                classButtonName="", 
                                onClick, 
                                type="button", 
                                disabled=false}) {
    return (
        <button type={type} 
                className={classButtonName} 
                onClick={onClick}
                disabled={disabled}>{text}</button>
    );
}