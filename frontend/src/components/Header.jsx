// Este componente permitira utilizar un mismo
// header en todas las paginas

import { Link, useNavigate } from "react-router-dom";
import "../styles.css";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import LoadImage from "../util/loadImage";

export default function Header(){
    const { user } = useUser();
    const navigate = useNavigate();

    // Muestra la parte de arriba de la pagina
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <header>
            <div className="cinema-logo">
                <img src={LoadImage("cinema_logo.png")} 
                    onClick={() => navigate("/")}/>
            </div>

            <nav className="nav-header">
                {
                    user?.role === "Administrator" ? "":
                    <>
                        <Link to="/">Home</Link>
                        <Link to="/now-playing">Now Playing</Link>
                        <Link to="/coming-soon">Coming Soon</Link>
                        <Link to="/menu">Menu</Link>
                        <Link to="/experiences">Experiences</Link>
                    </>
                }
                
            {
                (user) ? 
                    <Link to={`${user.role === "Administrator" ? "/admin" : ""}/account`} className="profile-img"><img src={LoadImage("profile.png")}/></Link>:
                    <Link to="/login">Log In</Link>
            }
            </nav>
        </header>
    );
};  