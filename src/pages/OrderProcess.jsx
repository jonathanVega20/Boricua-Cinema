// Pagina donde se realiza  

import "../styles.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MoviesProvider from "../context/MovieContext";
import ProcessBar from "../components/order_process/ProcessBar";
import SelectTickets from "../components/order_process/SelectTickets";
import Button from "../components/Button";
import { useState } from "react";
import SelectChair from "../components/order_process/SelectSeats";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import WarningMessage from "../components/WarningMessage";
import SelectPopcorn from "../components/order_process/SelectPopcorn";
import LoadImage from "../util/loadImage";
import ResumeMovieSelected from "../components/order_process/ResumeMovieSelected";
import FoodsProvider from "../context/FoodsContext";
import Checkout from "../components/order_process/Checkout";
import { useForm } from "react-hook-form";
import { useOrders } from "../context/OrdersContext";
import { useMovies } from "../context/MovieContext";
import OrdersProvider from "../context/OrdersContext";

// Pagina para seleccionar las taquillas
export default function OrderProcess(){
    return(
        <>
        <MoviesProvider>
        <OrdersProvider>
          <DoOrderProcess />
        </OrdersProvider>
        </MoviesProvider>  
        </>
    )
}

function DoOrderProcess(){
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState("Tickets");
    const navigate = useNavigate();
    const [warning, setWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const methods = useForm();
    const {orders, setOrders} = useOrders();
    const { movies } =  useMovies();
    const [movie, setMovie] = useState(movies.find(movie => movie.id == id));

    // Se mueve a la siguiente pagina
    const moveForward = () => {

        // Si hay taquillas sigue a la siguiente pagina
        // de lo contrario mostrara un mensaje de advertencia
        if(currentPage == "Tickets"){
            const ticketsJson = JSON.parse(localStorage.tickets);
            const ticketsAmount = ticketsJson.reduce((amount, tickets) => amount + tickets.amount, 0);

            if(ticketsAmount > 0){
                setCurrentPage("Seats");
                setWarning(false);
                setWarningMessage("");
            }
            else {
                setWarning(true);
                setWarningMessage("No hay taquillas seleccionadas");
            }

        }
        else if(currentPage == "Seats"){
            const seats = JSON.parse(localStorage.seats);
            const ticketsJson = JSON.parse(localStorage.tickets);
            const ticketsAmount = ticketsJson.reduce((amount, tickets) => amount + tickets.amount, 0);

            // Valida que se haya escogido los asientos
            if(seats.length == ticketsAmount){
                setCurrentPage("Popcorns");
                setWarning(false);
                setWarningMessage("");
            }
            else if ((seats.length > 0) && (seats.length < ticketsAmount)){
                const seatsRemaining = ticketsAmount - seats.length;
                const setLetterN = seatsRemaining > 1 ? "n" : "";
                const setLetterS = seatsRemaining > 1 ? "s" : "";

                setWarning(true);
                setWarningMessage(`Falta${setLetterN} ${seatsRemaining} asiento${setLetterS} por escoger`);
            }
            else {
                setWarning(true);
                setWarningMessage("No hay asientos seleccionados");
            }
        }
        else if(currentPage == "Popcorns"){
            setCurrentPage("Checkout");
        }
        else if(currentPage == "Checkout"){
            methods.handleSubmit(onSubmit)();

            // Borrar lo que hay en el localstorage luego de 
            // que la el pago se haya realizado con exito

            const tickets = [{
                    type: "children",
                    amount: 0,
                    total: 0.00
                }, {
                    type: "adult",
                    amount: 0,
                    total: 0.00
                }, {
                    type: "senior",
                    amount: 0,
                    total: 0.00
                }];

            localStorage.tickets = JSON.stringify(tickets);
            localStorage.seats = JSON.stringify([]);
            localStorage.items = JSON.stringify([]);
        }
        else 
            console.log("Page not available.")
    }    
    
    // Se mueve a la pagina anterior
    const moveBackward = () => {

        // Inicializa la cantidad de taquillas en
        // la orden y vuelve a la pagina de la pelicula
        if(currentPage == "Tickets"){
            const tickets = [{
                    type: "children",
                    amount: 0,
                    total: 0.00
                }, {
                    type: "adult",
                    amount: 0,
                    total: 0.00
                }, {
                    type: "senior",
                    amount: 0,
                    total: 0.00
                }];

            const ticketsJson = JSON.stringify(tickets);
            localStorage.tickets = ticketsJson;

            navigate(`/movie-information/${id}`);
        }
        else if(currentPage == "Seats"){
            const seatsJson = JSON.stringify([]);
            localStorage.seats = seatsJson;

            setCurrentPage("Tickets");
        }
        else if(currentPage == "Popcorns"){
            const itemsJson = JSON.stringify([]);
            localStorage.items = itemsJson;
            
            setCurrentPage("Seats");
        }
        else if(currentPage == "Checkout"){
            setCurrentPage("Popcorns");
        }
        else 
            console.log("Page not available.")

        setWarning(false);
        setWarningMessage("");
    }

    // Funcion para cuando se realice el pago
    const onSubmit = (data) => {
        const tickets = JSON.parse(localStorage.tickets ?? "[]") ;
        const seats = JSON.parse(localStorage.seats ?? "[]");
        const items = JSON.parse(localStorage.items ?? "[]");

        setOrders(prev => [...prev, {
            id: 1,
            movie: movie,
            tickets: tickets,
            seats: seats,
            items: items,
            payment: data 
        }])

        navigate(`/order-receipt/${1}`);
    }

    return (
        <>
            <Header />
            <main id="order-process">
                <ProcessBar page={currentPage}/>  

                <ResumeMovieSelected movie={movie}  currentPage={currentPage}/>

                {
                    // Pagina para seleccionar las taquillas
                    (currentPage == "Tickets") ? 
                       <SelectTickets /> :

                        // Pagina para seleccionar los asientos    
                       (currentPage == "Seats") ? 
                        <SelectChair /> :

                            // Pagina para seleccionar la comida 
                            (currentPage == "Popcorns") ?
                            <FoodsProvider>
                                <SelectPopcorn />
                            </FoodsProvider> : 

                                // Pagina para pagar
                                <Checkout methods={methods} onSubmit={onSubmit} />
                }  
                    
                {/* Botones para ir hacia adelante o hacia atras */}
                <div className="btn-div">
                    <Button text="Back" classButtonName="btn btn-another" onClick={moveBackward}/>
                    <Button text="Next" classButtonName="btn " onClick={moveForward} />
                </div>
                    
                { (warning) ? <WarningMessage message={warningMessage}/> : "" }

            </main>
            <Footer />
        </>
    )
}


// ***************************** TO DO *******************************
// 1. Hacer una funcion que maneje las acciones de "back" y "next" (Actualizar)
// 2. Validar si se puede seguir para el siguiente paso o no (Actualizar)
// 3. Mostrar el metodo de pago
// 4. Verificar que entre a la tanda correcta 