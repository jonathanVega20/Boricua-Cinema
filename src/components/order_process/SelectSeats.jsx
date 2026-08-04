// Componente para seleccionar los asientos
// segun la cantidad de taquillas

import "../../styles.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SelectSeats() {
    const [remainingSeats, setRemainingSeats] = useState(0);
    const [seatsSelected, setSeatsSelected] = useState(() => {
        return JSON.parse(localStorage.seats ?? "[]");
    });


    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
    const seats = Array.from({length: 20}).map((elem, count) => count + 1, 0);

    // Asientos que no estan disponibles de pruebas
    const seatsDisabled = ["A1", "M12", "M13", "K8", "K9", "K10", "K11", "K12"];


    // Obtiene todos los asientos que disponibles para escoger
    // segun las taquillas seleccionadas
    useEffect(() => {
        const ticketsJson = JSON.parse(localStorage.tickets);
        const ticketsAmount = ticketsJson.reduce((amount, tickets) => amount + tickets.amount, 0);  

        if(seatsSelected.length > 0)
            setRemainingSeats(ticketsAmount - seatsSelected.length)
        else 
            setRemainingSeats(ticketsAmount);

    }, [])

    // Selecciona o deja de seleccionar un asiento
    const selectSeat = (e) => {
        const seatNumber = e.target.value;
        
        if(!seatsSelected.find(seat => seat == seatNumber)){
            if(remainingSeats > 0){
                setSeatsSelected(prev => [...prev, seatNumber].sort((a, b) => a.localeCompare(b, undefined, {numeric: true})));
                setRemainingSeats(prev => prev - 1);
            }
        }
        else {
            setSeatsSelected(seatsSelected.filter(seat => seat != seatNumber));
            setRemainingSeats(prev => prev + 1);
        }
    }

    // Guarda los asientos escogidos en el localeStorage
    useEffect(() => {
        const seatsJson = JSON.stringify(seatsSelected);
        localStorage.seats = seatsJson;

    }, [seatsSelected])

    return (
        <>
            <div id="select-seats">
                <h2>Select your seats</h2>
                <div id="room-simulation">
                    <div id="screen-simulation"></div>
                    
                    <table id="seats-simulation">
                        <tbody>
                        {
                            rows.map((row, key1) => 
                                <tr key={key1}>
                                    {seats.map((seat, key2) => 
                                        <td className="seat" key={key2}>
                                            <input type="checkbox" 
                                                   disabled={(seatsDisabled.find(s => s == row+seat)) || ((remainingSeats == 0) && (!seatsSelected.find(s => s == row+seat))) ? true : false} 
                                                   className={(seatsDisabled.find(s => s == row+seat) ? "seat-not-available" : 
                                                                ((remainingSeats == 0) && (!seatsSelected.find(s => s == row+seat))) ? "seat-not-remaining" : "")}
                                                   value={row+seat} 
                                                   checked={seatsSelected.find(s => s == row+seat)}
                                                   onChange={selectSeat}/>
                                        </td>
                                    )}
                                </tr>
                            )
                        }    
                        </tbody>
                    </table>
                </div>
                <div id="info-seats-selected">
                    <h4>Selected seats: {seatsSelected.join(", ")}</h4>
                    <h4>Remaining seats: {remainingSeats}</h4>
                </div>
            </div>
        </>
    )
}