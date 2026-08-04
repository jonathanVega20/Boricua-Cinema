// Componente que permite colocar las peliculas que  
// han sido vistas por el usuario

import Text from "../Text";
import { useNavigate } from "react-router-dom";
import LoadImage from "../../util/loadImage";

export default function ViewMovie({movie}) {
    const navigate = useNavigate();

    return (
        <div className="movie-poster-card">
            <div className="movie-poster" onClick={() => navigate(`/movie-information/${movie.id}`)}>
                <img src={LoadImage(movie.poster)} />
            </div>
        </div>
    );
}