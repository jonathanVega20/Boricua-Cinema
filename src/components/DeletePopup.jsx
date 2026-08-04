// Popup para confirmar que se quiere eliminar algun dato

import "../styles.css";
import LoadImage from "../util/loadImage";
import Button from "./Button";

export default function DeletePopup({itemToDelete, deleteFunction, cancelDelete}) {
    return(
        <div className="delete-popup-background">
            <div className="delete-popup">
                <div className="delete-popup-image">
                    <img src={LoadImage("trash.png")}/>
                </div>

                <h2>Delete {itemToDelete}</h2>
                <p>Are you sure you want to delete this item?</p>

                <div className="btn-div">
                    <Button text="Yes, I'm sure" classButtonName="default-button" onClick={deleteFunction}/>
                    <Button text="No, cancel" classButtonName="default-button btn-another" onClick={cancelDelete} />
                </div>
            </div>
        </div>
    )
}