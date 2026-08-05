// Pagina donde los administradores podras
// manejar todas las salas

import AdminSidebar from "../../components/admin/AdminSidebar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../styles.css";
import Filter from "../../components/Filter";
import SortFilter from "../../components/SortFilter";
import Search from "../../components/Search";
import Button from "../../components/Button";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomsProvider, { useRooms } from "../../context/RoomsContext";
import { getRoomsName } from "../../util/rooms";

export default function AdminRooms(){
    return (
        <RoomsProvider>
            <AdminRoomsList />
        </RoomsProvider>
    )
}

function AdminRoomsList() {
    const { rooms } = useRooms();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [status, setStatus] = useState(0);
    const [type, setType] = useState("");
    const navigate = useNavigate();

    // Contiene las salas filtradas
    const roomsFiltered = useMemo(() => {
        const filtered = rooms.filter(room => 
            (room.status == status || status == 0) &&
            (room.type == type || type == "") 
        )

        return filtered.filter(room => 
                    getRoomsName(room.type).toLowerCase().includes(search.toLowerCase()) 
                ).sort((a,b) => {
                    if(sort == "asc") return a.room - b.room
                    if(sort == "desc") return b.room - a.room
                    return null
                })

    }, [sort, search, status, type])

    return (
        <>
            <Header />
            <main className="profile-page">
                <AdminSidebar />
                <div className="profile-info admin-pages">
                    <h1>Rooms</h1>
                                        

                    {/* Filtros */}
                    <Search search={search}  onChange={setSearch}/>



                    <div id="history-tool-bar">
                        <div className="filters">
                            <Filter heading="Status" value={status} setValue={setStatus}>
                                <option value={0}>All</option>
                                <option value={2}>Active</option>
                                <option value={1}>Inactive</option>
                            </Filter>

                            <Filter heading="Type" value={type} setValue={setType}>
                                <option value={""}>All</option>
                                <option value={"regular"}>Regular</option>
                                <option value={"cxc"}>CXC</option>
                                <option value={"imax"}>IMAX</option>
                                <option value={"fourd"}>4D</option>
                            </Filter>
                    
                            <SortFilter sort={sort} setSort={setSort}/>    
                        </div>

                        <div className="tickets-btn">
                            <Button text={"Manage Tickets"} classButtonName="btn btn-another" onClick={() => {navigate("tickets")}}/>
                        </div>
                    
                        <Button text={"+"} classButtonName="btn-add" onClick={() => {navigate("manage")}}/>
                    </div>   

                    <table className="table-list">
                        <thead>
                            <tr>
                                <th>Room</th>
                                <th>Capacity</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            roomsFiltered?.length > 0 ?
                                roomsFiltered?.map((room, key) => 
                                    <tr className="select-table-row"
                                        key={key} 
                                        onClick={() => navigate(`manage/${room.room}`)}>
                                        <td>{room.room}</td>
                                        <td>{room.capacity}</td>
                                        <td>{getRoomsName(room.type)}</td>
                                        <td>{(room.status == 1) ? "Inactive" : "Active"}</td>
                                    </tr>
                                )
                            : <tr><td className="not-available-table-message" colSpan={4}>Rooms not available</td></tr>
                        }
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </>
    )
}