import Header from '../components/Header';
import Footer from '../components/Footer';
import Search from '../components/Search';
import ComingSoonCard from '../components/coming_soon/ComingSoonCard';
import { useState, useEffect, useMemo } from 'react';
import MoviesProvider, { useMovies } from '../context/MovieContext';

// Pagina de las peliculas que estaran pronto
export default function ComingSoon() {
    return (
        <MoviesProvider>
            <ComingSoonMovies />
        </MoviesProvider>
    )
}

// Muestra todas las peliculas que se estrenaran
export function ComingSoonMovies() {
    const [search, setSearch] = useState("");
    const {movies} = useMovies();
    
    // Buscara las peliculas desde el servidor
    // useEffect(() => {
    //     const fetchMovies = async () => {
    //         const response = await fetch("https://ccom.upra.edu/~vegrivjo/cinema_api/api.php");
    //         const data = await response.json();
    //         setMovies(data);
    //     };
    //     fetchMovies();
    // }, [])

    // Filtra las peliculas
    const filteredMovies = useMemo(() => {
        return movies.filter(movie => 
            movie.title.toLowerCase().includes(search.toLowerCase()) ||
            movie.genre.toLowerCase().includes(search.toLowerCase())
        )
    }, [search])

    return (
        <>
            <Header />
            <main id='coming-soon'>
                <h1>Coming Soon</h1>
                <Search value={search} onChange={setSearch}/>
                <div id='coming-soon-container'>
                    {(filteredMovies.length !== 0) ?
                        filteredMovies.map((movie, key) =>
                            <ComingSoonCard key={key} movie={movie} />
                        )
                        : <h2>There are no movies available at the moment.<br/>Please check back later.</h2>
                    }
                </div>
            </main>
            <Footer />
        </>
    );
}