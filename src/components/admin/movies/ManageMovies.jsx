// Componente con el formulario
// para llenar la informacion de una pelicula

import Header from "../../Header";
import AdminSidebar from "../AdminSidebar";
import Footer from "../../Footer";
import MoviesProvider, { useMovies } from "../../../context/MovieContext";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import Button from "../../Button";
import Filter from "../../Filter";
import LoadImage from "../../../util/loadImage";
import ButtonImage from "../../ButtonImage";
import RoomsProvider, { useRooms } from "../../../context/RoomsContext";
import {getRoomsName, showtimesHours} from "../../../util/rooms";
import { getDateFormat, getHour } from "../../../util/timeFunctions";
import WarningMessage from "../../WarningMessage";
import ErrorBubble from "../../ErrorBubble";
import DeletePopup from "../../DeletePopup";

// Pagina donde se manejara la informacion de la pelicula
export default function ManageMovies() {
    return (
        <MoviesProvider>
            <RoomsProvider>
                <ManageMovieInfo />   
            </RoomsProvider>
        </MoviesProvider>
    )
}

// Tendra el formulario para la informacion de la pelicula
function ManageMovieInfo() {
    const { id } = useParams();
    const { movies, setMovies } = useMovies();
    const { rooms } = useRooms();
    const today = new Date();
    const action = (id) ? "Edit Movie" : "Add Movie";
    const uploadRef = useRef();
    const [warning, setWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");

    const [movie, setMovie] = useState(id ? movies.find(movie => movie.id == id) : {});

   // Valores relacionado al eliminar 
   const [deleteItemId, setDeleteItemId] = useState(null);
   const [showPopup, setShowPopup] = useState(false);
   const [itemToDelete, setItemToDelete] = useState("");

    // Valores para editar
    const [isEditing, setIsEditing] = useState(id ? false : true);
    const [editingShowtime, setEditingShowtime] = useState(null);
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm();

    const editShowtimeForm = useForm();

    // Referencia para subir la imagen
    const {
        ref,
        ...posterRegister
    } = register("poster", {
        required: id ? false : "Enter the poster"
    });
    
    useEffect(() => {
        reset({
            title: movie?.title || "",
            duration: movie?.duration || "",
            genre: movie?.genre || "",
            director: movie?.director || "",
            producer: movie?.producer || "",
            casting: movie?.casting || "",
            description: movie?.description || "",
            poster: movie?.poster || "",
            status: movie?.status || "",
            releaseDate: movie?.releaseDate || ""
        })
    }, [])

    const poster = watch("poster");

    // Funcion que se ejecuta cuando se someta el formulario
    const onSubmit = (data) => {
        console.log(data)

        setMovie(prev => ({
            title: data.title,
            duration: data.duration,
            genre: data.genre,
            director: data.director,
            producer: data.producer,
            casting: data.casting,
            description: data.description,
            poster: data.poster,
            status: data.status,
            releaseDate: data.releaseDate,
            showtimes: [...prev.showtimes]
        }))

        setIsEditing(false);
        setEditingShowtime(null);
    }

    // Cambia al modo editor y viceversa
    const changeEditingMode = (e) => {
        e.preventDefault();

        if(isEditing){
            reset()
            setWarning(false);
            setWarningMessage("");
        }
                
        setIsEditing(!isEditing);
        setEditingShowtime(null);
    }

    // Funcion para añadir un nuevo showtime
    const addShowtime = () => {
        setMovie(prev => ({
            ...prev,
            showtimes: [...prev.showtimes , {
                    id: 8,
                    date: "",
                    room: "",
                    hour: "",
                    language: "",
                    roomType: "",
                }
            ]
        }))
        setEditingShowtime(movie.showtimes.length)
    }

    // Funcio para editar la informacion del showtime
    const editShowtime = (evt) => {
        // evt.preventDefault();
        const values = editShowtimeForm.getValues().showtimes[editingShowtime];

        if((values.room != "") && values.hour && values.date && (values.language != "")){
            setMovie(prev => ({
                ...prev,
                showtimes: prev.showtimes.map(showtime => 
                    (showtime.id == values.id) ? 
                    {
                        ...showtime,
                        room: values.room,
                        date: values.date,
                        hour: values.hour,
                        language: values.language,
                        roomType: values.roomType
                    }   : showtime
                )
            }))
            setEditingShowtime(null)
        }
        else{
            setWarning(true)
            setWarningMessage("Data is missing")}
    }
    
    // Funcion para cancelar el modo edicion de los showtimes
    const cancelEditShowtime = (evt, id) => {
        evt.preventDefault();
        const showtime = movie.showtimes.find(showtime => showtime.id == id);

        if(!(showtime.room && showtime.hour && showtime.date && showtime.language))
            setMovie(prev => ({
                ...prev,
                showtimes: prev.showtimes.filter(showtime => showtime.id != id)
            }))

        setWarning(false);
        setWarningMessage("");
        setEditingShowtime(null);
    }

    // Funcion para solicitar eliminar un showtime
    const requestToDelete = (evt, id, item) => {
        evt.preventDefault();

        setDeleteItemId(id);
        setShowPopup(true);
        setItemToDelete(item);
    }

    // Funcion para eliminar un showtime
    const deleteItem = (evt) => {
        evt.preventDefault();

        if(itemToDelete == "Showtime")
            setMovie(prev => ({
                ...prev,
                showtimes: prev.showtimes.filter(showtime => showtime.id != deleteItemId)
            }))
        else if(itemToDelete == "Movie")
            setMovies(prev => prev.filter(movie => movie.id != deleteItemId))
        else {
            setWarning(true);
            setWarningMessage("We're sorry, there was an error")
        }

        setDeleteItemId(null);
        setShowPopup(false);
    }

    // Funcion para cancelar el elimar un showtime 
    const cancelDelete = (evt) => {
        evt.preventDefault();
        
        setDeleteItemId(null);
        setShowPopup(false);
    }

    return (
        <>
            <Header />
            <main className="profile-page">
                <AdminSidebar />

                <div className="profile-info admin-pages">
                    <h1>{action}</h1>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="delete-button">
                            <div className="delete-circles"></div>
                            <div className="delete-circles"></div>
                            <div className="delete-circles"></div>
                        </div>
                        <input id="id" type="hidden" disabled={!isEditing} {...register("id")}/>

                        <div className="inputs-campus">
                            <div className="input-image-poster">
                                <label htmlFor="poster" className={`upload-movie-poster ${isEditing ? "" : "disabled"}`}>
                                    <img src={LoadImage(poster ? poster : "upload_image.png")} 
                                    style={{
                                        width: poster == "" ? "100px" : "100%",
                                        margin: "auto"
                                    }}/>
                                </label>

                                <input id="poster" type="file" 
                                    disabled={!isEditing} 
                                    hidden
                                    {...posterRegister}
                                    ref={ elem => {
                                        ref(elem);
                                        uploadRef.current = elem;
                                    }}/>

                                <ErrorMessage errors={errors.poster} />

                                <Button text={"Upload image"} classButtonName=" btn upload-btn" 
                                    onClick={() => uploadRef.current.click()} disabled={!isEditing}/>
                            </div>
                            <div className="my-information-form">
                                <div className="input-form">
                                    <label htmlFor="title">Title</label>
                                    <input id="title" type="text" disabled={!isEditing}
                                        {...register("title", {
                                            required: "Enter the title"
                                        })}/>

                                    <ErrorMessage errors={errors.title} />
                                </div>

                                <div className="input-form">
                                    <label htmlFor="duration">Duration</label>
                                    <input id="duration" type="text" disabled={!isEditing}
                                        {...register("duration", {
                                            required: "Enter the duration"
                                        })}/>

                                    <ErrorMessage errors={errors.duration} />
                                </div>

                                <div className="input-form">
                                    <label htmlFor="genre">Genre</label>
                                    <input id="genre" type="text" disabled={!isEditing}
                                        {...register("genre", {
                                            required: "Enter the genre",
                                        })}/>

                                    <ErrorMessage errors={errors.genre} />
                                </div>

                                <div className="input-form">
                                    <label htmlFor="director">Director</label>
                                    <input id="director" type="text" disabled={!isEditing}
                                        {...register("director", {
                                            required: "Enter the director"
                                        })}/>

                                    <ErrorMessage errors={errors.director} />
                                </div>

                                <div className="input-form">
                                    <label htmlFor="producer">Producer</label>
                                    <input id="producer" type="text" disabled={!isEditing}
                                        {...register("producer", {
                                            required: "Enter the producer"
                                        })}/>

                                    <ErrorMessage errors={errors.producer} />
                                </div>

                                <div className="input-form">
                                    <label htmlFor="casting">Casting</label>
                                    <input id="casting" type="text" disabled={!isEditing}
                                        {...register("casting", {
                                            required: "Enter the casting",
                                        })}/>

                                    <ErrorMessage errors={errors.casting} />
                                </div>
                                
                                <div className="input-form">
                                    <label htmlFor="status">Status</label>
                                    <select
                                        className="input-select"
                                        {...register("status", {
                                            required: "Enter a status",
                                            setValueAs: value => Number(value),
                                            validate: value => 
                                                value != 0 || "Enter a status"
                                        })}
                                        disabled={!isEditing}>
                                        <option value={0}>Select</option>
                                        <option value={1}>Now Showing</option>
                                        <option value={2}>Coming Soon</option>
                                        <option value={3}>Inactive</option>
                                    </select>
                                        
                                    <ErrorMessage errors={errors.status} />
                                </div>

                                <div className="input-form">
                                    <label htmlFor="releaseDate">Release Date</label>
                                    <input id="releaseDate" type="date" disabled={!isEditing}
                                        {...register("releaseDate", {
                                            required: "Enter the releaseDate",
                                            validate: value => {
                                                const date = new Date(value + "T00:00:00");
                                                today.setHours(0,0,0,0);

                                                return (date < today) 
                                                        ? "The date has already passed." 
                                                        : true
                                            },
                                            min: today                                            
                                        })}/>

                                    <ErrorMessage errors={errors.releaseDate} />
                                </div>
                            </div>
                        </div>

                        <div className="input-form">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" disabled={!isEditing}
                                {...register("description", {
                                    required: "Enter the description",
                                })}/>

                            <ErrorMessage errors={errors.description} />
                        </div>


                        {/* Se muestra todos los shows que tendra la pelicula en las 
                            las diferentes salas del cine */}
                        <h2>Showtimes</h2>

                        <table className="table-list">
                            <thead>
                                <tr>
                                    <th>Room</th>
                                    <th>Date</th>
                                    <th>Hour</th>
                                    <th>Language</th>
                                    {isEditing ? <th><Button text={"+"} classButtonName="btn-add" onClick={addShowtime}/> </th>: ""}
                                </tr>
                            </thead>
                            <tbody>
                            {
                                movie?.showtimes?.length > 0 ? 
                                    movie?.showtimes.map((showtime, key) =>
                                        <tr key={key}>
                                            <td className="input">
                                            {
                                                editingShowtime === key ? <>
                                                    <input defaultValue={showtime.id} 
                                                        {...editShowtimeForm.register(`showtimes.${key}.id`, {
                                                            setValueAs: value => Number(value)
                                                        })} hidden/>

                                                    <div className="showtime-error-div">
                                                        <select
                                                            className="input-select"
                                                            defaultValue={showtime.room}
                                                            {...editShowtimeForm.register(`showtimes.${key}.room`, {
                                                                setValueAs: value => Number(value),
                                                                validate: value => {
                                                                    return value == "" 
                                                                        ? "Select a room" 
                                                                        : true} 
                                                            })}
                                                            disabled={!isEditing}>
                                                                <option value={""}>Select</option>
                                                            {// Muestra todas las salas disponibles
                                                                rooms.map((room, roomKey) => 
                                                                    <option key={roomKey} value={room.room} disabled={room.status != 2 ? true : false}>{room.room} &#40;{getRoomsName(room.type)}&#41;</option>
                                                                )
                                                            }
                                                        </select>    

                                                        <ErrorBubble error={editShowtimeForm.formState.errors.showtimes?.[editingShowtime]?.room?.message}/>
                                                    </div>                                                                                                  
                                                
                                                    <input defaultValue={showtime.roomType} 
                                                        {...editShowtimeForm.register(`showtimes.${key}.roomType`)} hidden/>
                                                </>
                                                
                                                : showtime.room
                                            }
                                            </td>
                                            <td>
                                            {
                                                editingShowtime === key ? 
                                                    <div className="showtime-error-div">
                                                        <input defaultValue={showtime.date} type="date"
                                                            {...editShowtimeForm.register(`showtimes.${key}.date`, {
                                                                required: "Enter a date",
                                                                validate: value => {
                                                                    const date = new Date(value + "T00:00:00");
                                                                    today.setHours(0,0,0,0);

                                                                    return (date < today) 
                                                                            ? "The date has already passed." 
                                                                            : true
                                                                },
                                                                min: today
                                                            })}/> 

                                                        <ErrorBubble error={editShowtimeForm.formState.errors.showtimes?.[editingShowtime]?.date?.message}/>
                                                    </div>
                                                : getDateFormat(showtime.date)
                                            }
                                            </td>
                                            <td>
                                            {
                                                editingShowtime === key ? 
                                                    <div className="showtime-error-div">
                                                        <select
                                                            className="input-select"
                                                            defaultValue={showtime.hour}
                                                            {...editShowtimeForm.register(`showtimes.${key}.hour`, {
                                                                validate: value => {
                                                                    return value == "" 
                                                                        ? "Select a hour" 
                                                                        : true} 
                                                            })}
                                                            disabled={!isEditing}>
                                                                <option value={""}>Select</option>
                                                            {// Muestra todas las salas disponibles
                                                                showtimesHours.map((hour, hourKey) => 
                                                                    <option key={hourKey} value={hour}>{getHour(hour)}</option>
                                                                )
                                                            }
                                                        </select>  

                                                        <ErrorBubble error={editShowtimeForm.formState.errors.showtimes?.[editingShowtime]?.hour?.message}/>
                                                    </div>
                                                : getHour(showtime.hour)
                                            }
                                            </td>
                                            <td>
                                            {
                                                editingShowtime === key ? 
                                                    <div className="showtime-error-div">
                                                        <select
                                                            className="input-select"
                                                            defaultValue={showtime.language}
                                                            {...editShowtimeForm.register(`showtimes.${key}.language`, {
                                                                validate: value => {
                                                                    return value == "" 
                                                                        ? "Select a language" 
                                                                        : true} 
                                                            })}
                                                            disabled={!isEditing}>
                                                            <option value="">Select</option>
                                                            <option value="Spanish">Spanish</option>
                                                            <option value="English">English</option>
                                                        </select>   
                                                        
                                                        <ErrorBubble error={editShowtimeForm.formState.errors.showtimes?.[editingShowtime]?.language?.message}/>
                                                    </div>
                                                : showtime.language
                                            }
                                            </td>

                                            {/* Se muestra los botones dependiendo la accion que se quiere realizar */}
                                            {isEditing ? 
                                                <td className="edit-showtime">
                                                    {
                                                        editingShowtime === key ? 
                                                        <>
                                                            <Button text={"Save"} classButtonName="btn" onClick={(evt) => {evt.preventDefault();editShowtimeForm.handleSubmit(editShowtime)()}}/>
                                                            <Button text={"Cancel"} classButtonName="btn btn-another" onClick={(evt) => cancelEditShowtime(evt, showtime.id)}/>
                                                        </>
                                                        :
                                                        <>
                                                            <ButtonImage srcImage={LoadImage("edit.png")} classButtonName="trash-btn" onClick={() => setEditingShowtime(key)}/>
                                                            <ButtonImage srcImage={LoadImage("trash.png")} classButtonName="trash-btn" onClick={(evt) => {requestToDelete(evt, showtime.id, "Showtime")}}/>    
                                                        </>
                                                    }
                                                    
                                                </td>: ""}
                                        </tr>) 
                                        : <tr><td className="not-available-table-message" colSpan={5}>Showtimes not available</td></tr>
                            }
                            </tbody>
                        </table>

                        { (warning) ? <WarningMessage message={warningMessage}/> : "" }

                        {
                            // Debo colocar las validaciones del patron
                            (isEditing) ? 
                                <div className="btn-div">
                                    <Button text="Save" classButtonName="btn" type="submit" />
                                    <Button text="Cancel" classButtonName="btn btn-another" onClick={changeEditingMode}/>
                                    <ButtonImage srcImage={LoadImage("trash.png")} classButtonName="delete-btn" onClick={(evt) => requestToDelete(evt, movie.id, "Movie")}/>
                                </div> : <Button text="Edit" classButtonName="btn" onClick={changeEditingMode}/>
                        }
                    </form>
                </div>

                {showPopup ? <DeletePopup itemToDelete={(itemToDelete == "Showtime") ? "Showtime" : "Movie"} deleteFunction={deleteItem} cancelDelete={cancelDelete}/> : ""}
                
            </main>
            <Footer />
        </>
    )    
}