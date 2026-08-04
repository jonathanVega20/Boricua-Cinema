// Contexto que obtiene las diferenetes salas
// con los difentes precios de las taquillas

import { createContext, useContext, useState } from "react";

const TicketsContext = createContext();

export default function TicketsProvider(props) {
    const [tickets, setTickets] = useState([{
        roomType: "regular",
        roomName: "Regular",
        prices: {
            children: 4.71,
            adult: 8.30,
            senior: 4.71
        }
    },{
        roomType: "cxc",
        roomName: "CXC",
        prices: {
            children: 5.10,
            adult: 9.30,
            senior: 5.10
        }
    },{
        roomType: "imax",
        roomName: "IMAX",
        prices: {
            children: 5.70,
            adult: 10.30,
            senior: 5.70
        }
    },{
        roomType: "vip",
        roomName: "VIP",
        prices: {
            children: 6.10,
            adult: 12.10,
            senior: 6.10
        }
    },{
        roomType: "fourd",
        roomName: "4D",
        prices: {
            children: 5.90,
            adult: 11.20,
            senior: 5.90
        }
    },]);
    return (
        <>
            <TicketsContext.Provider
                value={{tickets, setTickets}}>
                {props.children}
            </TicketsContext.Provider>
        </>
    )
}

export const useTickets = () => useContext(TicketsContext);