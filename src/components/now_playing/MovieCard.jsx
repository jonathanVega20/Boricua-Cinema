// Componente que muestra la informacion de las peliculas 

import Text from "../Text";
import MovieHour from "../MovieHour";
import { useNavigate } from "react-router-dom";
import LoadImage from "../../util/loadImage";

export default function MovieCard({movie}){
    const navigate = useNavigate();
    
    return (
        <div className="movie-card"  onClick={() => navigate(`/movie-information/${movie.id}`)}>
            <div className="movie-poster">
                <img src={LoadImage(movie.poster)} />
            </div>

            <div className="movie-information-card">
                <h2>{movie.title}</h2>

                <div className="movie-sub-information">
                    <Text>{movie.duration}</Text>
                    <Text>{movie.genre}</Text>
                </div>

                <p>{movie.description}</p>

                <div className="movie-showtimes">
                    {movie.showtimes.map((showtime, index) => 
                        <div key={index}>
                            <MovieHour movieID={movie.id} hour={showtime.hour} language={showtime.language} 
                                    roomType={showtime.roomType}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}