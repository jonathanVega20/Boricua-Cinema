// Contexto para obtener todas las peliculas 
// vistas por el usuario

import { useState, createContext, useContext } from "react";

const ViewMoviesContext = createContext();

export default function ViewMoviesProvider(props) {
    const [viewMovies, setViewMovies] = useState([
        {
            id: 1,
            title: "Zootopia 2",
            poster: "movies/zootopia.jpg",
            genre: "Family",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            duration: "2 hr 45 min",
            releaseDate: "25 december",
            status: "1",
            showtimes: [
                {
                    date: "2026-07-13",
                    hour: "13:00",
                    language: "Spanish",
                    roomType: "regular",
                },
                {
                    date: "2026-07-13",
                    hour: "13:30",
                    language: "English",
                    roomType: "regular",
                },
                {
                    date: "2026-07-13",
                    hour: "14:20",
                    language: "English",
                    roomType: "cxc",
                },
                {
                    date: "2026-07-13",
                    hour: "15:00",
                    language: "English",
                    roomType: "vip",
                },
                {
                    date: "2026-07-13",
                    hour: "16:10",
                    language: "English",
                    roomType: "imax",
                },
                {
                    date: "2026-07-13",
                    hour: "18:00",
                    language: "Spanish",
                    roomType: "regular",
                },
                {
                    date: "2026-07-13",
                    hour: "20:00",
                    language: "Spanish",
                    roomType: "fourd",
                },
            ],
        },
        {
            id: 2,
            title: "Now You See Me 3",
            poster: "movies/now_you_see_me.jpg",
            genre: "Action",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            duration: "2 hr 45 min",
            releaseDate: "25 december",
            status: "1",
            showtimes: [
                {
                    date: "2026-07-13",
                    hour: "13:00",
                    language: "Spanish",
                    roomType: "regular",
                },
                {
                    date: "2026-07-13",
                    hour: "13:30",
                    language: "English",
                    roomType: "regular",
                },
                {
                    date: "2026-07-13",
                    hour: "14:20",
                    language: "English",
                    roomType: "cxc",
                },
                {
                    date: "2026-07-13",
                    hour: "15:00",
                    language: "English",
                    roomType: "vip",
                },
                {
                    date: "2026-07-13",
                    hour: "16:10",
                    language: "English",
                    roomType: "imax",
                },
                {
                    date: "2026-07-13",
                    hour: "18:00",
                    language: "Spanish",
                    roomType: "regular",
                },
                {
                    date: "2026-07-13",
                    hour: "20:00",
                    language: "Spanish",
                    roomType: "fourd",
                },
            ],
        },
        {
            id: 3,
            title: "Avatar: Ash and Fire",
            poster: "movies/avatar.jpg",
            genre: "Science Fiction",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            duration: "2 hr 45 min",
            releaseDate: "25 december",
            status: "1",
            showtimes: [
                {
                    date: "2026-07-13",
                    hour: "13:00",
                    language: "Spanish",
                    roomType: "regular",
                },
                {
                    date: "2026-07-13",
                    hour: "13:30",
                    language: "English",
                    roomType: "regular",
                },
                {
                    date: "2026-07-13",
                    hour: "14:20",
                    language: "English",
                    roomType: "cxc",
                },
                {
                    date: "2026-07-13",
                    hour: "15:00",
                    language: "English",
                    roomType: "vip",
                },
                {
                    date: "2026-07-13",
                    hour: "16:10",
                    language: "English",
                    roomType: "imax",
                },
                {
                    date: "2026-07-13",
                    hour: "18:00",
                    language: "Spanish",
                    roomType: "regular",
                },
                {
                    date: "2026-07-13",
                    hour: "20:00",
                    language: "Spanish",
                    roomType: "fourd",
                },
            ],
        },
    ])

    return (
        <ViewMoviesContext.Provider
            value={{viewMovies, setViewMovies}}
        >
            {props.children}
        </ViewMoviesContext.Provider>
    )
}

export const useViewMovies = () => useContext(ViewMoviesContext);