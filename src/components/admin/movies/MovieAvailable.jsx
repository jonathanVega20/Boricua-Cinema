// Componente que permite colocar las peliculas que  
// han sido vistas por el usuario

import Text from "../../Text";
import { useNavigate } from "react-router-dom";
import LoadImage from "../../../util/loadImage";
import { getDateFormat, getReleaseDate } from "../../../util/timeFunctions";

export default function MovieAvailable({movie}) {
    const navigate = useNavigate();
    const movieStatus = (movie.status == 1) ? "Now Showing" 
                        : (movie.status == 2) ? "Coming Soon" 
                        : "Inactive";

    return (
        <div className="movie-poster-card">
            <div className="movie-poster" onClick={() => navigate(`manage/${movie.id}`)}>
                <img src={LoadImage(movie.poster)} />
            </div>
            <div className="movie-information-status">
                <p>{movieStatus}</p>
                {(movie.status == 2) ? <p>{getDateFormat(movie.releaseDate)}</p> : ""}
            </div>
        </div>
    );
}