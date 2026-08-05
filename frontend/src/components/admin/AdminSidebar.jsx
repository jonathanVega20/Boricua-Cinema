// Menu de un lado en la parte de la 
// cuenta de los administradores

import "../../styles.css";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
    return (
        <div className="profile-sidebar">
            <nav>
                <Link to="/admin">Dashboard</Link>
                <Link to="/admin/movies">Movies</Link>
                <Link to="/admin/foods">Foods</Link>
                <Link to="/admin/rooms">Rooms</Link>
                <Link to="/admin/accounts">Accounts</Link>
            </nav>    
        </div>
    )
}