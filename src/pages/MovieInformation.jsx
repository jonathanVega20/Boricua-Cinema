import "../styles.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Favorite from "../components/movie_information/Favorite";
import Rating from "../components/movie_information/Rating";
import MoviesProvider, { useMovies } from "../context/MovieContext";
import LoadImage from "../util/loadImage";
import { getMonth, getDay, getDatesFormat } from "../util/timeFunctions";
import MovieShowtime from "../components/movie_information/MovieShowtime";

// Pagina que mostrara la informacion de la pelicula seleccionada
export default function MovieInformation() {
    return (
        <MoviesProvider>
            <Movie />
        </MoviesProvider>
    )
}

// Componente que obtendra la informacion de la pelicula
export function Movie() {
    const { id } = useParams();
    const {movies} = useMovies();
    const [movie, setMovie] = useState(movies.find(movie => movie.id == id));
    const [week, setWeek] = useState([]);
    
    // useEffect(() => {
    //     const fetchMovies = async () => {
    //         const response = await fetch("https://ccom.upra.edu/~vegrivjo/cinema_api/api.php");
    //         const data = await response.json();
    //         setMovie(data.find(movie => movie.id == id));
    //     };
    //     fetchMovies();
    // }, []);


    // Muestra los dias de jueves a miercoles
    useEffect(() => {
        const today = new Date();
        let month = today.getMonth();
        let date = today.getDate();
        const day = today.getDay();
        const year = today.getFullYear();
        const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let [dateString, dateFormat] = ["", ""];
        let availablesDays = [];

        // Si el dia actual es miercoles "3" muestra solamente
        // este dia y nada mas. De lo contrario mostrara los 
        // proximos dias
        if(day == 3){
            [dateString, dateFormat] = getDatesFormat(day, month, date, year);

            availablesDays.push({
                stringDate: dateString,
                date: dateFormat
            })
        }

        else {
            for(let i = day; i != 3; i++){
                [dateString, dateFormat] = getDatesFormat(day, month, date, year, i);

                availablesDays.push({
                    stringDate: dateString,
                    date: dateFormat
                })

                date++;

                // Cambia del dia sabado a domingo
                if(i == weekDays.length-1)
                    i = -1;
            }

            [dateString, dateFormat] = getDatesFormat(day, month, date, year, 3);

            availablesDays.push({
                stringDate: dateString,
                date: dateFormat
            })
        }

        setWeek([...availablesDays]);
    }, [])

    return (
        <>
            <Header />
            <main id="movie-information">
                <div id="background-poster"
                    style={{
                        backgroundImage: `url(${LoadImage(movie.poster)})`,
                    }}>
                    <div id="blur-div">
                        <div id="movie-information-poster">
                            <div id="movie-image">
                                <img src={LoadImage(movie.poster)}/>
                            </div>
                            <h1>{movie.title}</h1>
                        </div>
                    </div>
                </div>

                <div id="information-container">
                    <div>
                        <h4>Duration:</h4>
                        <span>{movie.duration}</span>
                    </div>
                    <div>
                        <h4>Producer:</h4>
                        <span>{movie.producer}</span>
                    </div>
                    <div>
                        <h4>Genre</h4>
                        <span>{movie.genre}</span>
                    </div>
                    <div>
                        <h4>Casting</h4>
                        <span>{movie.casting}</span>
                    </div>
                    <div>
                        <h4>Director</h4>
                        <span>{movie.director}</span>
                    </div>
                    <div>
                        <h4>Rating</h4>
                        <span>In progress....</span>
                    </div>
                    <div id="movie-description">
                        <h4>Description:</h4>
                        <p>{movie.description}</p>
                    </div>
                    <div></div>
                </div>

                <div className="movie-interactions">
                    <Favorite />
                    <Rating />
                </div>
                
                <div id="movie-showtime">
                    <div className="showtime-header">
                        <hr className="showtime-line"/>
                        <h2>Showtimes</h2>
                        <hr className="showtime-line"/>
                    </div>

                    {week.map((day, key) => 
                        <MovieShowtime key={key} movie={movie} day={day}/>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}