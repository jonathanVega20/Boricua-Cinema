// Este componente permite colocar toda la
// los datos prinicipales para la parte del admin

import Text from "../../Text";
import LoadImage from "../../../util/loadImage";
import { useNavigate } from "react-router-dom";

export default function FoodAvailable({food}) {
    const navigate = useNavigate();

    return (
        <div className="food-card">
            <div className="food-image"
                onClick={() => navigate(`manage/${food.id}`)}
                style={{
                    backgroundImage: `url(${LoadImage(food.image)})`,
                }}>
            </div>

            <h3>{food.name}</h3>

            <p>{food.type}</p>
        </div>
    );
}