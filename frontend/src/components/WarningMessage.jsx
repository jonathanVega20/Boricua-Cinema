// Pequeño popup para mostrar un mensaje 
// de advertencia

import "../styles.css";
import LoadImage from "../util/loadImage";

export default function WarningMessage({message = ""}) {
    return (
        <>
        <div id="warning-message">
            <div><img src={LoadImage("warning_message.png")} /></div>
            <p>{message}</p>
        </div>
        </>
    )
}