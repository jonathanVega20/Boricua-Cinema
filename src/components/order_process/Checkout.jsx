//  Componente para realizar el pago de la compra

import { useEffect, useMemo } from "react";
import "../../styles.css";
import ProcessBar from "./ProcessBar";
import ResumeHeader from "./ResumeHeader";
import ResumeMovieSelected from "./ResumeMovieSelected";
import PaymentMethod from "../PaymentMethod";
import { useUser } from "../../context/UserContext";

export default function Checkout({methods, onSubmit}) {
    const { user } = useUser()
    const tickets = JSON.parse(localStorage.tickets ?? "[]");
    const seats = JSON.parse(localStorage.seats ?? "[]");
    const items = JSON.parse(localStorage.items ?? "[]");

    const total = useMemo(() => {
        const ticketsAmountPrice = tickets.reduce((count, ticket) => count + ticket.total, 0);
        const itemsAmountPrice = items.reduce((count, item) => count + (item.amount * item.price), 0);

        return ticketsAmountPrice + itemsAmountPrice;
    })

    return (
        <>
        <div id="checkout">
            <div className="checkout-resume">
                <h2>Resume</h2>

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

                <div id="checkout-total">
                    <h3>Total</h3>
                    <p>${total.toFixed(2)}</p>
                </div>
            </div>

            <div className="checkout-resume">
                <h2>Payment Method</h2>

                <PaymentMethod methods={methods} onSubmit={onSubmit} page="Checkout" user={user}/>
            </div>
        </div>
        </>
    )
}