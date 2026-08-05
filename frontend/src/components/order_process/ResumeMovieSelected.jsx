// Componente que tiene un pequeño resumen
// acerca de la pelicula que selecciono el cliente

import "../../styles.css";
import LoadImage from "../../util/loadImage";

export default function ResumeMovieSelected({movie, currentPage="Tickets"}) {
    return (
        <>
            <div id="order-movie-poster">
                {/* Imagen de la peliculas */}
                {(currentPage == "Tickets") ?
                    <div id="order-movie-image">
                        <img src={LoadImage(movie.poster)}/>
                    </div> : ""
                }
                
                {/* Informacion acerca de la pelicula y el horario */}
                <h1>{movie.title}</h1>
                <div className="brief-info">
                    <h4>Thu, December 18</h4>
                <div className="info-separator"></div>
                    <h4>1:00 P.M.</h4>
                <div className="info-separator"></div>
                    <h4>Spanish</h4>
                </div>
            </div>
        </>
    )
}