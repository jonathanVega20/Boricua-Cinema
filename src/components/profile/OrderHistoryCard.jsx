// Muestra la informacion de la orden

import "../../styles.css";
import LoadImage from "../../util/loadImage";
import { getDateFormat } from "../../util/timeFunctions";
import { useMemo } from "react";
import OrderHistoryReceipt from "./OrderHistoryReceipt";

export default function OrderHistoryCard({order, setOrder}) {

    // Obtiene el total de la orden
    const total = useMemo(() => {
            const ticketsAmountPrice = order.tickets.reduce((count, ticket) => count + ticket.total, 0);
            const itemsAmountPrice = order.items.reduce((count, item) => count + (item.amount * item.price), 0);
    
            return ticketsAmountPrice + itemsAmountPrice;
    })

    return (
        <div className="order-history-card" onClick={() => setOrder(order)}>
            <div className="order-movie-poster">
                <img src={LoadImage(order.movie.poster)} />
            </div>

            <div className="order-movie-info">
                <h3>{order.movie.title}</h3>
                <div>
                    <p>{order.movie.duration}</p>
                    <p>{order.movie.genre}</p>
                </div>
                <p>{getDateFormat(order.movie.showtimes[0].date)} - {order.movie.showtimes[0].hour} ({order.movie.showtimes[0].language})</p>

                <div className="order-movie-total">
                    <p>Total: ${total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}