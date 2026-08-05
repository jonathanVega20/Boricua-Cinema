// Pagina que muestra las interacciones
// que ha tenido el usuario con las peliculas
// ya sea que las califico, le gusto o la vio

import "../styles.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AccountSidebar from "../components/profile/AccountSidebar";
import { useState } from "react";
import MoviesProvider, { useMovies } from "../context/MovieContext";
import ViewMovie from "../components/profile/ViewMovie";
import FavoriteMovie from "../components/profile/FavoriteMovie";
import RatedMovie from "../components/profile/RatedMovie";
import FavoritesMoviesProvider, { useFavoritesMovies } from "../context/FavoritesMovies";
import ViewMoviesProvider, { useViewMovies } from "../context/ViewMovies";
import RatedMoviesProvider, { useRatedMovies } from "../context/RatedMovies";
import OrdersProvider from "../context/OrdersContext";

// Pagina que muestra las interacciones del
// usuario con las diferentes peliculas
export default function MoviesAccount() {
    return(
        <MoviesProvider>
        <OrdersProvider>
        <ViewMoviesProvider>
        <FavoritesMoviesProvider>
        <RatedMoviesProvider>
            <Movies />
        </RatedMoviesProvider>
        </FavoritesMoviesProvider>
        </ViewMoviesProvider>
        </OrdersProvider>
        </MoviesProvider>

    )
}

// Muestra las peliculas vista, calificadas y gustadas
function Movies() {
    const { viewMovies } = useViewMovies();
    const { favoritesMovies } = useFavoritesMovies();
    const { ratedMovies } = useRatedMovies();
    const [option, setOption] = useState("Views")

    return (
        <>
            <Header />
            <main className="profile-page">
                <AccountSidebar />
                <div className="profile-info" id="movies-account">
                    <h1>Movies</h1>

                    <div className="movies-options">
                        <div className="option">
                            <p className={(option == "Views") ? "option-selected" : ""}
                                onClick={() => setOption("Views")}>Views</p>
                        </div>
                        <div className="div-separator"></div>
                        <div className="option">
                            <p className={(option == "Favorites") ? "option-selected" : ""}
                                onClick={() => setOption("Favorites")}>Favorites</p>
                        </div>
                        <div className="div-separator"></div>
                        <div className="option">
                            <p className={(option == "Rated") ? "option-selected" : ""}
                                onClick={() => setOption("Rated")}>Rated</p>
                        </div>
                    </div>

                    <div className="movies-list">
                        {
                            (option == "Views") ?
                                viewMovies.map((movie, key) => 
                                    <ViewMovie key={key} movie={movie} />) : 
                                (option == "Favorites") ?
                                    favoritesMovies.map((movie, key) => 
                                        <FavoriteMovie key={key} movie={movie} />) :
                                        ratedMovies.map((movie, key) => 
                                            <RatedMovie key={key} movie={movie} />)
                        }
                    </div>
                </div>

                
            </main>
            <Footer />
        </>
    )
}