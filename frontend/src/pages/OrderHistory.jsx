// Pagina que muestra un historial con
// todas las ordenes realizadas

import { useEffect, useMemo, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AccountSidebar from "../components/profile/AccountSidebar";
import Search from "../components/Search";
import "../styles.css";
import OrdersProvider, { useOrders } from "../context/OrdersContext";
import OrderHistoryCard from "../components/profile/OrderHistoryCard";
import OrderHistoryReceipt from "../components/profile/OrderHistoryReceipt";
import SortFilter from "../components/SortFilter";

// Pagina donde se mostraran las ordenes realizadas
export default function OrderHistory() {
    return (
        <OrdersProvider>
            <Orders />
        </OrdersProvider>
    )
}

// Se mostraran las ordenes realizadas
function Orders() {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const { orders } = useOrders();
    const [order, setOrder] = useState(null);

    // Devuelve las ordernes segun los filtro utilizados
    const ordersFiltered = useMemo(() => {
        return orders.filter( order =>
                order.movie.title.toLowerCase().includes(search.toLowerCase()) ||
                order.movie.genre.toLowerCase().includes(search.toLowerCase()) 
            ).sort((a,b) => {
                if (sort == "asc") return a.movie.title.localeCompare(b.movie.title)
                else if (sort == "desc") return  b.movie.title.localeCompare(a.movie.title)
            })
    }, [search, sort])

    return (
        <>
            <Header />
            <main className="profile-page">
                <AccountSidebar />
                
                <div className="profile-info">
                    <h1>Order History</h1>

                    <div id="history-tool-bar">
                        <div><Search value={search} onChange={setSearch}/></div>
                        
                        <SortFilter sort={sort} setSort={setSort} />
                    </div>

                    {/* Muestra todas las ordenes realizadas */}
                    <div className="order-history-list">
                    {
                        ordersFiltered.map((order, key) => 
                            <OrderHistoryCard key={key} order={order} setOrder={setOrder} />)
                    }
                    </div>
                </div>
            </main>
            <Footer />

            {/* Si se escogio una orden muestra el recibo de esta */}
            { order ? <OrderHistoryReceipt order={order} setOrder={setOrder}/> : "" }
            
        </>
    )
}