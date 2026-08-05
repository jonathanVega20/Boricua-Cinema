// Componente que muestra el error de un input
import "../styles.css";

export default function ErrorMessage({errors}){
    return(
        <>
        {
            errors && 
                <p className="error-message">{errors.message}</p>
        }
        </>
    )
}