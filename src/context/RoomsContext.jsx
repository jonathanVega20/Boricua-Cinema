// Componente donde muestra todas las salas
// que tiene la sala disponibles

import { useState, createContext, useContext } from "react";

const RoomsContext = createContext();

export default function RoomsProvider(props) {
    const [rooms, setRooms] = useState([
        {
            room: 1,
            type: "regular",
            capacity: 260,
            status: 2,
            showtimes: [{
                id: 1,
                movieId: 2,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 2,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 3,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 4,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },]
        },{
            room: 2,
            type: "cxc",
            capacity: 260,
            status: 2,
            showtimes: [{
                id: 1,
                movieId: 2,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 2,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 3,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 4,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },]
        },{
            room: 3,
            type: "regular",
            capacity: 260,
            status: 2,
            showtimes: [{
                id: 1,
                movieId: 2,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 2,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 3,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 4,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },]
        },{
            room: 4,
            type: "imax",
            capacity: 260,
            status: 2,
            showtimes: [{
                id: 1,
                movieId: 2,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 2,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 3,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 4,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },]
        },{
            room: 5,
            type: "imax",
            capacity: 260,
            status: 2,
            showtimes: [{
                id: 1,
                movieId: 2,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 2,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 3,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 4,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },]
        },{
            room: 6,
            type: "regular",
            capacity: 260,
            status: 2,
            showtimes: [{
                id: 1,
                movieId: 2,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 2,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 3,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 4,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },]
        },{
            room: 7,
            type: "cxc",
            capacity: 260,
            status: 2,
            showtimes: [{
                id: 1,
                movieId: 2,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 2,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 3,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 4,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },]
        },{
            room: 8,
            type: "regular",
            capacity: 260,
            status: 1,
            showtimes: [{
                id: 1,
                movieId: 2,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 2,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 3,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 4,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },]
        },{
            room: 9,
            type: "regular",
            capacity: 260,
            status: 2,
            showtimes: [{
                id: 1,
                movieId: 2,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 2,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 3,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 4,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },]
        },{
            room: 10,
            type: "fourd",
            capacity: 260,
            status: 2,
            showtimes: [{
                id: 1,
                movieId: 2,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 2,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 3,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 4,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },]
        },{
            room: 11,
            type: "regular",
            capacity: 260,
            status: 1,
            showtimes: [{
                id: 1,
                movieId: 2,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 2,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 3,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },{
                id: 4,
                movieId: 5,
                title: "Star Wars: Revenge of the Sith",
                date: "2026-08-20",
                hour: "13:00",
                language: "English",
            },]
        },
    ])
    return (
        <RoomsContext.Provider
            value={{rooms, setRooms}}>
            {props.children}
        </RoomsContext.Provider>
    )
}

export const useRooms = () => useContext(RoomsContext);