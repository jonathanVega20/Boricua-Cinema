// Componente que permitira utilizar un mismo 
// footer en todas las paginas

import { Link, useNavigate } from "react-router-dom";
import "../styles.css";
import Text from "./Text";
import LoadImage from "../util/loadImage";

export default function Footer() {
    const year = new Date().getFullYear();
    const copyright = `© Copyright ${year} Boricua Cinema.`;
    const author = "By Jonathan J. Vega Rivera";
    const navigate = useNavigate();

    return (
        <footer>
            <div id="footer-row">
                <div className="cinema-logo">
                    <img src={LoadImage("cinema_logo.png")} 
                        onClick={() => navigate("/")}/>
                </div>
                
                <nav className="nav-header">
                    <Link to="/">Home</Link>
                    <Link to="/now-playing">Now Playing</Link>
                    <Link to="/coming-soon">Coming Soon</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/experiences">Experiences</Link>
                    <Link to="/login">Log In</Link>
                </nav>
            </div>

            <hr className="footer-line"/>

            <div id="footer-author">
                <Text>{copyright}</Text>
                <Text>{author}</Text>
            </div>
        </footer>
    );
}