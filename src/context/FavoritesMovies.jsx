// Contexto para obtener todas las peliculas 
// favoritas del usuario

import { useState, createContext, useContext } from "react";

const FavoritesMoviesContext = createContext();

export default function FavoritesMoviesProvider(props) {
    const [favoritesMovies, setFavoritesMovies] = useState([
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
            favorite: true
        },
        {
            id: 4,
            title: "Tron: Ares",
            poster: "movies/tron.jpg",
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
            favorite: true
        },
        {
            id: 5,
            title: "Star Wars: Revenge of the Sith",
            poster: "movies/star_wars_rots.jpg",
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
            favorite: true
        },
    ])

    return (
        <FavoritesMoviesContext.Provider
            value={{favoritesMovies, setFavoritesMovies}}
        >
            {props.children}
        </FavoritesMoviesContext.Provider>
    )
}

export const useFavoritesMovies = () => useContext(FavoritesMoviesContext);