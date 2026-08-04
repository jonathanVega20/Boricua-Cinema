// Componente que permite colocar la hora y el 
// idioma que se presentara la pelicula
import { useNavigate } from "react-router-dom";
import { getHour } from "../util/timeFunctions";

export default function MovieHour({movieID, hour, language, roomType}) {
    const navigate = useNavigate();

    return (
        <div className="movie-hour" onClick={(e) => {
            e.stopPropagation();
            navigate(`/process-order/${movieID}`)}}>
            <div className={`hour ${roomType !== "" ? `${roomType}` : ""}`}>{getHour(hour)}</div>
            <div className="language">{language}</div>
        </div>
    );
}