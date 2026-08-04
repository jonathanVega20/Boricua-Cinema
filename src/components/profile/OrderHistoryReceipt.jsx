// Muestra una ventana con el recibe de 
// la orden completa

import "../../styles.css";
import { useMemo, useEffect } from "react";
import ResumeMovieSelected from "../order_process/ResumeMovieSelected";
import ResumeHeader from "../order_process/ResumeHeader";

export default function OrderHistoryReceipt({order, setOrder}) {
    const tickets = order.tickets ?? [];
    const seats = order.seats ?? [];
    const items = order.items ?? [];
    const payment = order.payment ?? [];

    // Obtiene el total de la orden
    const total = useMemo(() => {
        const ticketsAmountPrice = tickets.reduce((count, ticket) => count + ticket.total, 0);
        const itemsAmountPrice = items.reduce((count, item) => count + (item.amount * item.price), 0);
    
        return ticketsAmountPrice + itemsAmountPrice;
    })

    // Hace que lo que este atras del div no haga scroll
    useEffect(() => {
        // Deshabilita el scroll de la página
        document.body.style.overflow = "hidden";

        // Lo restaura al cerrar el popup
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);
    
    return (
        <div className="order-receipt-popup">
            <div onClick={() => setOrder(null)} className="close-popup">X</div>

            <div className="order-receipt-content">
                <div className="checkout-resume">
                    <h1>Receipt</h1>

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
            </div> 
        </div>
    )
}