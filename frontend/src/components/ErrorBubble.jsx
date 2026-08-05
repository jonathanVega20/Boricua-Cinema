// Componente que muestra una burbuja con un mensaje de error
import "../styles.css";

export default function ErrorBubble({error}){
    return (
        <>
        {
            (error) ?
                <div className="error-bubble">{error}</div>
            : ""
        }
        </>
    )

}