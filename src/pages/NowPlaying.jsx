// Pagina donde se mostrara todas las 
// las peliculas que estan en exhibicion

import "../styles.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import Showtimes from "../components/now_playing/Showtimes";
import { useCallback, useEffect, useMemo, useState } from "react";
import MovieCard from "../components/now_playing/MovieCard";
import MoviesProvider, { useMovies } from "../context/MovieContext";
import SortFilter from "../components/SortFilter";

// Pagina que muestra las peliculas que se estan
// exponiendo actualmente en el cine
export default function NowPlaying(){
    return(<>
        <MoviesProvider>
            <NowPlayingMovies />
        </MoviesProvider>
    </>)
}

// Componente que mostra la informacion de todas
// las peliculas
export function NowPlayingMovies(){
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("")
    const {movies} = useMovies();

    // useEffect(() => {
    //     const fetchMovies = async () => {
    //         const response = await fetch("https://ccom.upra.edu/~vegrivjo/cinema_api/api.php");
    //         const data = await response.json();
    //         setMovies(data);
    //     };
    //     fetchMovies();
    // }, [sort])

    // Permite filtrar las peliculas
    const filteredMovies = useMemo(() => {
        return movies.filter( movie =>
                movie.title.toLowerCase().includes(search.toLowerCase()) ||
                movie.genre.toLowerCase().includes(search.toLowerCase()) ||
                movie.description.toLowerCase().includes(search.toLowerCase())
            ).sort((a,b) => {
                if (sort == "asc") return a.title.localeCompare(b.title)
                else if (sort == "desc") return  b.title.localeCompare(a.title)
                    else null
            })
    }, [sort, search])

    return (
        <>
            <Header />
            <main id="now-playing">
                <h1>Now Playing</h1>
                <Search value={search} onChange={setSearch} />
                
                {/* Muestra las fechas de las posibles peliculas */}
                <div id="showtimes">
                    <div id="showtime-header">
                        <div><h2>Showtimes</h2></div>
                        <SortFilter sort={sort} setSort={setSort}/>
                    </div>

                    <hr className="showtime-line"/>

                    <Showtimes />
                </div>

                {/* Lista de todas las peliculas */}
                <div id="movies-container">
                    {(filteredMovies.length !== 0) ?
                        filteredMovies.map((movie, key) => 
                            <div key={key}>
                            <MovieCard movie={movie}/></div>
                        )
                        : <h2>There are no movies available at the moment.<br/>Please check back later.</h2>
                    }
                </div>
            </main>
            <Footer />
        </>
    );
}