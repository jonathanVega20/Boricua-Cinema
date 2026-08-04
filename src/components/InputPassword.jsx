// Este componente permitira utilizar los campos para las
// las contraseñas los cualer permitira la opcion de poder
// ver cual cual contraseña fue la que se colocó

import { useState } from "react";
import OpenEye from "../assets/open_eye.png";
import CloseEye from "../assets/close_eye.png";
import "../styles.css";

export default function InputPassword() {
    const [eyeStatus, setEyeStatus] = useState(false);

    return (
        <div className="password-input">
            <input type={eyeStatus ? "text" : "password"} id="password" placeholder="Password" />
                <button onClick={() => setEyeStatus(!eyeStatus)} className="icon-button">
                    <img src={eyeStatus ? CloseEye : OpenEye} alt="Password not visible" />
                </button>
        </div>
    );
}