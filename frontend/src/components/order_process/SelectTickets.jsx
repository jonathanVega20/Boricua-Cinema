// Componente para seleccionar la cantidad de 
// taquillas de la pelicula

import { useCallback, useEffect, useState } from "react";
import { useMovies } from "../../context/MovieContext";
import "../../styles.css";
import { useParams } from "react-router-dom";
import LoadImage from "../../util/loadImage";

export default function SelectTickets() {
    const [childrenTickets, setChildrenTickets] = useState(() => {
        const tickets = JSON.parse(localStorage.tickets ?? "[]");

        return tickets[0] ? tickets[0] : {
        type: "Children",
        amount: 0,
        total: 0.00
    }});
    const [adultTickets, setAdultTickets] = useState(() => {
        const tickets = JSON.parse(localStorage.tickets ?? "[]");

        return tickets[1] ? tickets[1] : {
        type: "Adult",
        amount: 0,
        total: 0.00
    }});
    const [seniorTickets, setSeniorTickets] = useState(() => {
        const tickets = JSON.parse(localStorage.tickets ?? "[]");

        return tickets[2] ? tickets[2] : {
        type: "Senior",
        amount: 0,
        total: 0.00
    }});

    // Resta la cantidad de tickets
    const subtractTickets = useCallback((tickets, setTickets, price) => {
        if(tickets <= 0)
            setTickets({
                amount: 0, 
                total: 0.00
            });
        else 
            setTickets(prev => ({
                ...prev,
                amount: prev.amount - 1,
                total: prev.total - price
            }));
    })

    // Suma la cantidad de tickets
    const addTickets = useCallback((tickets, setTickets, price) => {
        setTickets(prev => ({
            ...prev,
            amount: prev.amount + 1,
            total: prev.total + price
        }));
    })

    // Almacenara la cantidad de taquillas en el local storage
    useEffect(() => {
        const tickets = [childrenTickets, adultTickets, seniorTickets];

        const ticketsJson = JSON.stringify(tickets);
        localStorage.tickets = ticketsJson;

    }, [childrenTickets, adultTickets, seniorTickets])
    
    return (
        <>
            <div id="select-tickets">
                <h2>Select the tickets</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Children</td>
                            <td>$4.71</td>
                            <td className="tickets-amount">
                                <button className="btn-tickets" onClick={() => subtractTickets(childrenTickets, setChildrenTickets, 4.71)}>-</button>
                                <p>{childrenTickets.amount}</p>
                                <button className="btn-tickets" onClick={() => addTickets(childrenTickets, setChildrenTickets, 4.71)}>+</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Adult</td>
                            <td>$8.30</td>
                            <td className="tickets-amount">
                                <button className="btn-tickets" onClick={() => subtractTickets(adultTickets, setAdultTickets, 8.30)}>-</button>
                                <p>{adultTickets.amount}</p>
                                <button className="btn-tickets" onClick={() => addTickets(adultTickets, setAdultTickets, 8.30)}>+</button>
                            </td>
                        </tr>
                        <tr>
                            <td>Senior</td>
                            <td>$4.71</td>
                            <td className="tickets-amount">
                                <button className="btn-tickets" onClick={() => subtractTickets(seniorTickets, setSeniorTickets, 4.71)}>-</button>
                                <p>{seniorTickets.amount}</p>
                                <button className="btn-tickets" onClick={() => addTickets(seniorTickets, setSeniorTickets, 4.71)}>+</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}