// Componente donde se colocara los links 
// para cada pagina en la parte del admin

import { Link } from "react-router-dom";
import "../../../styles.css";
import LoadImage from "../../../util/loadImage";

export default function DashboardLink({img, path, header}) {
    return(
        <Link className="dashboard-link"
            to={path}>
            <div className="dashboard-link-img">
                <img src={LoadImage(img)} />
            </div>
            
            <h2>{header}</h2>
        </Link>
    )
}