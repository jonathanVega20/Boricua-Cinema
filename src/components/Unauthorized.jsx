// Pagina cuando un usuario busque una pagina 
// en donde no este autorizado

import { useNavigate } from "react-router-dom";
import "../styles.css";
import LoadImage from "../util/loadImage";
import Button from "./Button";

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div id="unauthorized-page">
            <div className="unauthorized-div">
                <div className="cinema-logo">
                    <img src={LoadImage("cinema_logo.png")}/>
                </div>

                <div className="unauthorized-message">
                    <h1>You are not authorized to access the requested page</h1>
                    <Button text="Back" classButtonName="btn" onClick={() => navigate("/")}/>
                </div>
            </div>
        </div>
    )
}