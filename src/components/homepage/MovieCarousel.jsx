// Componente que tiene un carrusel con las 
// peliculas que estan o estaran disponibles en el cine

import Button from "../Button"
import "../../styles.css";
import ButtonImage from "../ButtonImage";
import { useState } from "react";
import { useMovies } from "../../context/MovieContext";
import LoadImage from "../../util/loadImage";
import { useNavigate } from "react-router-dom";

export default function MovieCarousel() {
    const {movies} = useMovies();
    const navigate = useNavigate();

    const nowPlaying = movies;
    const comingSoon = movies;
                
    // Para manejar que peliculas mostrar
    const [movieState, setMovieState] = useState(true);

    // Funcion que redirige a la pagina correspondiente
    const redirectPage = () => {
        if(movieState)
            navigate("/now-playing");
        else 
            navigate("/coming-soon");
    }

    return (
        <div id="carousel-movie">
            <h1>Movies</h1>

            {/* Muestra las opciones como las peliculas que estan disponibles como las que estaran pronto */}
            <div className="movies-options">
                <div className="option">
                    <p className={(movieState) ? "option-selected" : ""}
                        onClick={() => setMovieState((movieState) ? movieState : !movieState)}>Now Playing</p>
                </div>
                <div className="div-separator"></div>
                <div className="option">
                    <p className={(!movieState) ? "option-selected" : ""}
                        onClick={() => setMovieState((movieState) ? !movieState : movieState)}>Coming Soon</p>
                </div>
            </div>

            {/* Muestra todas las peliculas segun la opcion escogida */}
            <div id="carousel">
                { (movieState) ? 
                    nowPlaying.map((movie, key) => 
                        <ButtonImage key={key} 
                                     srcImage={`${LoadImage(movie.poster)}`} 
                                     classButtonName="movie-preview" 
                                     onClick={() => navigate(`/movie-information/${movie.id}`)}/>) : 
                    comingSoon.map((movie, key) => 
                        <ButtonImage key={key} srcImage={`${LoadImage(movie.poster)}`} classButtonName="movie-preview" />
                )}
                <Button text="See more" classButtonName="see-more" onClick={redirectPage}/>
            </div>
        </div>
    )
}