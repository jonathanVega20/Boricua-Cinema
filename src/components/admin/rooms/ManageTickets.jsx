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
import TicketsProvider, { useTickets } from "../../../context/TicketsContext";

// Pagina que mostrara la informacion de la sala
export default function ManageTickets() {
    return (
        <TicketsProvider>
            <ManageTicketsInfo />
        </TicketsProvider>
    )
}

// Componente que tendra el formulario para la sala
function ManageTicketsInfo() {
    const { id } = useParams();
    const { tickets, setTickets } = useTickets();
    const [warning, setWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");

   // Valores relacionado al eliminar 
   const [deleteItemId, setDeleteItemId] = useState(null);
   const [showPopup, setShowPopup] = useState(false);
   const [itemToDelete, setItemToDelete] = useState("");

    // Valores para editar
    const [isEditing, setIsEditing] = useState(id ? false : true);
    const [editingRoom, setEditingRoom] = useState(null);
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
        watch,
        getValues
    } = useForm();

    // const editShowtimeForm = useForm();

    // Funcion que se ejecuta cuando se someta el formulario
    const onSubmit = () => {
        const values = getValues();

        if((values.prices[editingRoom].children > 0) 
            && (values.prices[editingRoom].adult > 0) 
            && (values.prices[editingRoom].senior > 0)){

            setTickets(prev => prev.map(ticket =>
                ticket.roomType == values.roomType ? {
                    ...ticket,
                    prices: {
                        children: values.prices[editingRoom].children,
                        adult: values.prices[editingRoom].adult,
                        senior: values.prices[editingRoom].senior,
                    }
                } : ticket
            ))
            setEditingRoom(null)
        }
        else{
            setWarning(true)
            setWarningMessage("Data is missing")}
    }

    // Funcion para cancelar el modo edicion de los showtimes
    const cancelEditRoomPrices = (evt) => {
        evt.preventDefault();

        reset();

        setWarning(false);
        setWarningMessage("");
        setEditingRoom(null);
    }

    return (
        <>
            <Header />
            <main className="profile-page">
                <AdminSidebar />

                <div className="profile-info admin-pages">
                    <h1>Manage Tickets</h1>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* Tiene los diferentes precios para las difentes salas */}
                        <table className="table-list">
                            <thead>
                                <tr>
                                    <th>Room</th>
                                    <th>Children</th>
                                    <th>Adult</th>
                                    <th>Senior</th>
                                    {isEditing ? <th></th>: ""}
                                </tr>
                            </thead>
                            <tbody>
                            {
                                tickets?.length > 0 ? 
                                    tickets.map((ticket, key) =>
                                        <tr key={key}>
                                            <td className="input">{ticket.roomName}</td>
                                            <td>
                                            {
                                                editingRoom === key ? 
                                                    <div className="showtime-error-div">
                                                        <input defaultValue={ticket.roomType} type="text" readOnly hidden
                                                            {...register(`roomType`)}/> 

                                                        <input defaultValue={ticket.prices.children} type="number"
                                                            {...register(`prices.${key}.children`, {
                                                                required: "Enter a price",
                                                                setValueAs: value => Number(value),
                                                                min: {
                                                                    value: 1,
                                                                    message: "It must be greater than 0"
                                                                }
                                                            })}/> 

                                                        <ErrorBubble error={errors.prices?.[key]?.children?.message}/>
                                                    </div>
                                                : "$" + ticket.prices.children.toFixed(2)
                                            }
                                            </td>
                                            <td>
                                            {
                                                editingRoom === key ? 
                                                    <div className="showtime-error-div">
                                                        <input defaultValue={ticket.prices.adult} type="number"
                                                            {...register(`prices.${key}.adult`, {
                                                                required: "Enter a price",
                                                                setValueAs: value => Number(value),
                                                                min: {
                                                                    value: 1,
                                                                    message: "It must be greater than 0"
                                                                }
                                                            })}/> 

                                                        <ErrorBubble error={errors.prices?.[key]?.adult?.message}/>
                                                    </div>
                                                : "$" + ticket.prices.adult.toFixed(2)
                                            }
                                            </td>
                                            <td>
                                            {
                                                editingRoom === key ? 
                                                    <div className="showtime-error-div">
                                                        <input defaultValue={ticket.prices.senior} type="number"
                                                            {...register(`prices.${key}.senior`, {
                                                                required: "Enter a price",
                                                                setValueAs: value => Number(value),
                                                                min: {
                                                                    value: 1,
                                                                    message: "It must be greater than 0"
                                                                }
                                                            })}/> 

                                                        <ErrorBubble error={errors.prices?.[key]?.senior?.message}/>
                                                    </div>
                                                : "$" + ticket.prices.senior.toFixed(2)
                                            }
                                            </td>

                                            {/* Se muestra los botones dependiendo la accion que se quiere realizar */}
                                            <td className="edit-showtime">
                                                {
                                                    editingRoom === key ? 
                                                    <>
                                                        <Button text={"Save"} classButtonName="btn" type="submit"/>
                                                        <Button text={"Cancel"} classButtonName="btn btn-another" onClick={(evt) => cancelEditRoomPrices(evt, ticket.id)}/>
                                                    </>
                                                    :
                                                    <>
                                                        <ButtonImage srcImage={LoadImage("edit.png")} classButtonName="trash-btn" onClick={() => setEditingRoom(key)}/>
                                                    </>
                                                }
                                                    
                                            </td>
                                        </tr>) 
                                        : <tr><td className="not-available-table-message" colSpan={5}>Rooms types not available</td></tr>
                            }
                            </tbody>
                        </table>

                        { (warning) ? <WarningMessage message={warningMessage}/> : "" }
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}