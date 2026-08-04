// Pagina para manejar la informacion
// de las salas disponibles
import { useParams } from "react-router-dom";
import MoviesProvider, { useMovies } from "../../../context/MovieContext";
import RoomsProvider, { useRooms } from "../../../context/RoomsContext";
import "../../../styles.css";
import Footer from "../../Footer";
import Header from "../../Header";
import AdminSidebar from "../AdminSidebar";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import ErrorBubble from "../../ErrorBubble";
import Button from "../../Button";
import { getDateFormat, getHour } from "../../../util/timeFunctions";
import ButtonImage from "../../ButtonImage";
import LoadImage from "../../../util/loadImage";
import { showtimesHours } from "../../../util/rooms";
import DeletePopup from "../../DeletePopup";
import WarningMessage from "../../WarningMessage";

// Pagina que mostrara la informacion de la sala
export default function ManageRooms() {
    return (
        <MoviesProvider>
            <RoomsProvider>
                <ManageRoomsInfo />
            </RoomsProvider>
        </MoviesProvider>
    )
}

// Componente que tendra el formulario para la sala
function ManageRoomsInfo() {
    const { id } = useParams();
    const { rooms, setRooms } = useRooms();
    const { movies } = useMovies();
    const today = new Date();
    const action = (id) ? "Edit Room" : "Add Room";
    const [warning, setWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");

    const [room, setRoom] = useState(id ? rooms.find(room => room.room == id) : {});

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

    // Incializa los valores del formulario
    useEffect(() => {
        reset({
            room: room?.room || "",
            capacity: room?.capacity || "",
            type: room?.type || "",
            status: room?.status || "",
        })
    }, [])


    // Funcion que se ejecuta cuando se someta el formulario
    const onSubmit = (data) => {
        console.log(data)

        setRoom(prev => ({
            ...prev,
            room: data.room,
            capacity: data.capacity,
            type: data.type,
            status: data.status,
            showtimes: [...prev.showtimes]
        }))

        setIsEditing(false);
        setEditingShowtime(null);
    }

    // Cambia al modo editor y viceversa
    const changeEditingMode = (e) => {
        e.preventDefault();

        if(isEditing){
            reset();
            setWarning(false);
            setWarningMessage("");
        }
                
        setIsEditing(!isEditing);
        setEditingShowtime(null);
    }

    // Funcion para añadir un nuevo showtime
    const addShowtime = () => {
        setRoom(prev => ({
            ...prev,
            showtimes: [...prev.showtimes , {
                    id: 5,
                    date: "",
                    movieId: 0,
                    hour: "",
                    language: "",
                }
            ]
        }))
        setEditingShowtime(room.showtimes.length)
    }

    // Funcio para editar la informacion del showtime
    const editShowtime = (evt) => {
        // evt.preventDefault();
        const values = editShowtimeForm.getValues().showtimes[editingShowtime];

        if((values.movieId != 0) && (values.hour != "") && (values.date != "") && (values.language != "")){
            const movieTitle = movies.find(movie => movie.id == values.movieId).title;

            setRoom(prev => ({
                ...prev,
                showtimes: prev.showtimes.map(showtime => 
                    (showtime.id == values.id) ? 
                    {
                        ...showtime,
                        movieId: values.movieId,
                        title: movieTitle,
                        date: values.date,
                        hour: values.hour,
                        language: values.language,
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
        const showtime = room.showtimes.find(showtime => showtime.id == id);

        if(!(showtime.room && showtime.hour && showtime.date && showtime.language))
            setRoom(prev => ({
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
            setRoom(prev => ({
                ...prev,
                showtimes: prev.showtimes.filter(showtime => showtime.id != deleteItemId)
            }))
        else if (itemToDelete == "Room")
            setRooms(prev => prev.filter(room => room.room != deleteItemId))
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
                        <input id="id" type="hidden" disabled={!isEditing} {...register("id")}/>
                        <div className="my-information-form">
                            <div className="input-form">
                                <label htmlFor="room">Room</label>
                                <input id="room" type="text" disabled={!isEditing}
                                    {...register("room", {
                                        required: "Enter the room"
                                    })}/>

                                <ErrorMessage errors={errors.room} />
                            </div>

                            <div className="input-form">
                                <label htmlFor="capacity">Capacity</label>
                                <input id="capacity" type="number" disabled={!isEditing}
                                    {...register("capacity", {
                                        required: "Enter the capacity",
                                        validate: value =>
                                            (value < 1) 
                                            ? "The capacity must be greater than 0" 
                                            : true
                                    })}/>

                                <ErrorMessage errors={errors.capacity} />
                            </div>
                                
                            <div className="input-form">
                                <label htmlFor="type">Type</label>
                                <select
                                    className="input-select"
                                    {...register("type", {
                                        required: "Enter a type",
                                        setValueAs: value => Number(value),
                                        validate: value => 
                                            value != "" || "Enter a type"
                                    })}
                                    disabled={!isEditing}>
                                    <option value={""}>Select</option>
                                    <option value={"regular"}>Regular</option>
                                    <option value={"cxc"}>CXC</option>
                                    <option value={"imax"}>IMAX</option>
                                    <option value={"fourd"}>4D</option>
                                </select>
                                        
                                <ErrorMessage errors={errors.type} />
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
                                    <option value={2}>Active</option>
                                    <option value={1}>Inactive</option>
                                </select>
                                        
                                <ErrorMessage errors={errors.status} />
                            </div>
                        </div>


                        {/* Se muestra todos los shows que tendra la pelicula en las 
                            las diferentes salas del cine */}
                        <h2>Showtimes</h2>

                        <table className="table-list">
                            <thead>
                                <tr>
                                    <th>Movie</th>
                                    <th>Date</th>
                                    <th>Hour</th>
                                    <th>Language</th>
                                    {isEditing ? <th><Button text={"+"} classButtonName="btn-add" onClick={addShowtime}/> </th>: ""}
                                </tr>
                            </thead>
                            <tbody>
                            {
                                room?.showtimes?.length > 0 ? 
                                    room?.showtimes.map((showtime, key) =>
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
                                                            defaultValue={showtime.movieId}
                                                            {...editShowtimeForm.register(`showtimes.${key}.movieId`, {
                                                                setValueAs: value => Number(value),
                                                                validate: value => {
                                                                    return value == "" 
                                                                        ? "Select a movie" 
                                                                        : true},
                                                            })}
                                                            disabled={!isEditing}>
                                                                <option value={0}>Select</option>
                                                            {// Muestra todas las salas disponibles
                                                                movies.map((movie, movieKey) => 
                                                                    <option key={movieKey} value={movie.id}>{movie.title}</option>
                                                                )
                                                            }
                                                        </select>    

                                                        <ErrorBubble error={editShowtimeForm.formState.errors.showtimes?.[editingShowtime]?.movieId?.message}/>
                                                    </div>                                                                                                  
                                                </>
                                                : showtime.title
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
                                                                    const date = new Date(value);

                                                                    return (date.getTime() < today.getTime()) 
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
                                                            <Button text={"Save"} classButtonName="btn" onClick={(evt) => {evt.preventDefault(); editShowtimeForm.handleSubmit(editShowtime)()}}/>
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
                                    <ButtonImage srcImage={LoadImage("trash.png")} classButtonName="delete-btn" onClick={(evt) => requestToDelete(evt, room.id, "Room")}/>
                                </div> : <Button text="Edit" classButtonName="btn" onClick={changeEditingMode}/>
                        }
                    </form>
                </div>

                {showPopup ? <DeletePopup itemToDelete={(itemToDelete == "Showtime") ? "Showtime" : "Room"} deleteFunction={deleteItem} cancelDelete={cancelDelete}/> : ""}
                
            </main>
            <Footer />
        </>
    )
}