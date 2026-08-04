// Pagina donde los administradores podras
// manejar todas las peliculas

import AdminSidebar from "../../components/admin/AdminSidebar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MoviesProvider, { useMovies } from "../../context/MovieContext";
import "../../styles.css";
import MovieAvailable from "../../components/admin/movies/MovieAvailable";
import { useMemo, useState } from "react";
import Search from "../../components/Search";
import Button from "../../components/Button";
import SortFilter from "../../components/SortFilter";
import Filter from "../../components/Filter";
import { useNavigate } from "react-router-dom";

// Pagina donde se manejara las peliculas
export default function AdminMovies() {
    return (
        <MoviesProvider>
            <AdminMoviesList />
        </MoviesProvider>
    )
}

//  Componentes donde estaran todas las peliculas
function AdminMoviesList() {
    const { movies } = useMovies();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    //  Recibe un arreglo con las peliculas filtradas 
    const filteredMovies = useMemo(() => {
        // Busca segun el estatus activado
        const filtered = movies.filter(movie => 
                movie.status == status || status == 0
        )

        // Filtra lo demas
        return filtered.filter(movie => 
                    movie.title.toLowerCase().includes(search.toLowerCase()) ||
                    movie.genre.toLowerCase().includes(search.toLowerCase()) ||
                    movie.description.toLowerCase().includes(search.toLowerCase()) 
                ).sort((a,b) => {
                    if (sort == "asc") return a.title.localeCompare(b.title)
                    else if (sort == "desc") return  b.title.localeCompare(a.title)
                        else null
                })

    }, [search, status, sort])

    return (
        <>
            <Header />
            <main className="profile-page">
                <AdminSidebar />
                <div className="profile-info admin-pages">
                    <h1>Movies</h1>

                    {/* Filtros */}
                    <Search search={search}  onChange={setSearch}/>

                    <div id="history-tool-bar">
                        <div className="filters">
                            <Filter heading="Status" value={status} setValue={setStatus}>
                                <option value={0}>All</option>
                                <option value={1}>Now Showing</option>
                                <option value={2}>Coming Soon</option>
                                <option value={3}>Inactive</option>
                            </Filter>

                            <SortFilter sort={sort} setSort={setSort}/>    
                        </div>

                        <Button text={"+"} classButtonName="btn-add" onClick={() => {navigate("manage")}}/>
                    </div>                    

                    {/* Lista de todas las peliculas */}
                    <div className="movies-list">
                        {(filteredMovies.length !== 0) ?
                            filteredMovies.map((movie, key) => 
                                    <MovieAvailable key={key} movie={movie} />)
                            : <h2>There are no movies available at the moment.<br/>Please check back later.</h2>
                        }
                    </div>                    
                </div>
            </main>
            <Footer />
        </>        
    )
}