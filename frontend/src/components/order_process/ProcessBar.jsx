// Componente que muestra el proceso
// en el que se encuentra el cliente
import "../../styles.css";
import Tickets from "../../assets/tickets.png";
import PopCorn from "../../assets/pop_corn.png";
import Seats from "../../assets/chair.png";
import Checkout from "../../assets/checkout.png";

export default function ProcessBar({page = "Tickets"}){
    return (
        <div id="process-bar">
            <div className={`process ${page == "Tickets" ? "process-active" : ""}`}>
                <img src={Tickets} />
            </div>
            <div className="separate-line"></div>
            <div className={`process ${page == "Seats" ? "process-active" : ""}`}>
                <img src={Seats} />
            </div>
            <div className="separate-line"></div>
            <div className={`process ${page == "Popcorns" ? "process-active" : ""}`}>
                <img src={PopCorn} />
            </div>
            <div className="separate-line"></div>
            <div className={`process ${page == "Checkout" ? "process-active" : ""}`}>
                <img src={Checkout} />
            </div>
        </div>
    )
}