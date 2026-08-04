// Componente que permite colocar las peliculas que  
// han sido las favoritas del usuario

import Text from "../Text";
import { useNavigate } from "react-router-dom";
import LoadImage from "../../util/loadImage";
import Favorite from "../movie_information/Favorite";

export default function FavoriteMovie({movie}) {
    const navigate = useNavigate();

    return (
        <div className="movie-poster-card">
            <div className="movie-poster" onClick={() => navigate(`/movie-information/${movie.id}`)}>
                <img src={LoadImage(movie.poster)} />
            </div>

            <div className="movie-interactions">
                <Favorite active={movie.favorite} showText={false}/>
            </div>
        </div>
    );
}