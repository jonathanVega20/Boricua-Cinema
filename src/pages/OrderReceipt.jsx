// Pagina que muestra la confirmacion de 
// un pago y en un resumen de la orden

import "../styles.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadImage from "../util/loadImage";
import OrdersProvider, { useOrders } from "../context/OrdersContext";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ResumeMovieSelected from "../components/order_process/ResumeMovieSelected";
import ResumeHeader from "../components/order_process/ResumeHeader";
import Button from "../components/Button";

export default function OrderReceipt() {
    return (
        <>
        <OrdersProvider>
            <Receipt />
        </OrdersProvider>
        </>
    )
}

function Receipt() {
    const { id } = useParams();
    const { orders } = useOrders();
    const order = orders.find(order => order.id == id);
    const [tickets, setTickets] = useState([]);
    const [seats, setSeats] = useState([]);
    const [items, setItems] = useState([]);
    const [payment, setPayment] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();


    // Obtiene todos los datos
    useState(() => {
        setTickets(order.tickets ?? []);
        setSeats(order.seats ?? []);
        setItems(order.items ?? []);
        setPayment(order.payment ?? []);

    }, [])

    // VERIFICAR BIEN EL TOTAL CON LA IMPLEMENTACION DEL BACKEND
    useState(() => {
        setTotal(() => {
            const ticketsAmountPrice = tickets.reduce((count, ticket) => count + ticket.total, 0);
            const itemsAmountPrice = items.reduce((count, item) => count + (item.amount * item.price), 0);

            return ticketsAmountPrice + itemsAmountPrice;
        })
    }, [tickets, items])

    return (
        <>
            <Header />
            <main id="order-receipt-page">
                <div id="order-confirmation-message">
                    <div className="checkmark-icon">
                        <img src={LoadImage("check_mark.png")} />
                    </div>
                    <h1>Your order was successfully processed</h1>
                </div>

                <div className="checkout-resume">
                    <h1>Resume</h1>

                    <ResumeMovieSelected movie={order.movie}/>

                    {/* Muestra el resumen de las taquillas seleccionadas */}
                    <div>
                        <ResumeHeader image="tickets.png" header="Tickets "/>

                        <div className="resume-items">
                        { tickets.map((ticket, key)=> 
                            (ticket.amount > 0) ?
                            <div key={key}>
                                <p>{ticket.amount} {ticket.type}</p>

                                <p>${ticket.total.toFixed(2)}</p>
                            </div> : ""
                        )}
                        </div>
                    </div>

                    {/* Muestra un resumen de los asientos seleccionados */}
                    <div>
                        <ResumeHeader image="chair.png" header="Seats "/>

                        <div className="resume-items">
                            <div>
                                <p>{seats.join(" - ")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Muestra el resumen de las comidas seleccionadas */}
                    <div>
                        <ResumeHeader image="pop_corn.png" header="Foods "/>

                        <div className="resume-items">
                        {items.map((item, key)=> 
                            <div key={key}>
                                <p>{item.amount} {item.name} {item.type != "Chocolate" ? `- ${item.size}` : ""}</p>

                                <p>${(item.price * item.amount).toFixed(2)}</p>
                            </div>
                        )}
                        </div>
                    </div>
                    
                    {/* Muestra el metodo de pago */}
                    <div>
                        <ResumeHeader image="checkout.png" header="Payment "/>

                        <div className="resume-items">
                            <div>
                                <p>Payment Method</p>

                                <p>{payment.method}</p>
                            </div>
                        </div>
                    </div>

                    <div id="checkout-total">
                        <h3>Total</h3>
                        <p>${total.toFixed(2)}</p>
                    </div>
                </div>

                <div>
                    <Button text="Finish" classButtonName="btn " onClick={() => navigate("/")}/> 
                </div>
                
            </main>
            <Footer />
        </>
    )
}