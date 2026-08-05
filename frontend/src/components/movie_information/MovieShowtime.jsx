// Componente que mostrara las diferentes
// funciones que estaran disponibles en
// los dias de la semanas
import "../../styles.css";
import MovieHour from "../MovieHour";

export default function MovieShowtime({movie, day}){
    return (
        <div className="showtime">
            <h2>{day.stringDate}</h2>
            
            <div className="movie-showtimes">
                {movie.showtimes.map((showtime, index) =>
                    (day.date == showtime.date) ?
                        <div key={index}>
                            <MovieHour movieID={movie.id} hour={showtime.hour} language={showtime.language} 
                            roomType={showtime.roomType}/>
                        </div> : ""
                )}
            </div>
        </div>
    )
}