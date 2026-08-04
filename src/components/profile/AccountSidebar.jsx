// Menu de un lado en la parte de la 
// cuenta del cliente

import "../../styles.css";
import { Link } from "react-router-dom";

export default function AccountSidebar() {
    return (
        <div className="profile-sidebar">
            <h1>Account</h1>
            <nav>
                <Link to="/account">My Information</Link>
                <Link to="/account/payment-method">Payment Method</Link>
                <Link to="/account/order-history">Order History</Link>
                <Link to="/account/my-movies">Movies</Link>
            </nav>    
        </div>
    )
}