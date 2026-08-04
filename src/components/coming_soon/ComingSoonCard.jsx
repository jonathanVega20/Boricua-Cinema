// Componente que permite colocar las peliculas que estaran 
// disponibles proximamente

import Text from "../Text";
import { useNavigate } from "react-router-dom";
import LoadImage from "../../util/loadImage";
import { getReleaseDate } from "../../util/timeFunctions";

export default function ComingSoonCard({movie}) {
    const navigate = useNavigate();

    return (
        <div className="coming-soon-card">
            <div className="movie-poster" onClick={() => navigate(`/movie-information/${movie.id}`)}>
                <img src={LoadImage(movie.poster)} />
            </div>
            
            <div className="coming-soon-info">
                <Text>{getReleaseDate(movie.releaseDate)}</Text>
                <Text>{movie.genre}</Text>
            </div>
        </div>
    );
}