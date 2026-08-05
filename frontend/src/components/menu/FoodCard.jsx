// Este componente permite colocar toda la
// informacion acerca de un producto

import Text from "../Text";
import LoadImage from "../../util/loadImage";

export default function FoodCard({food}) {

    return (
        <div className="food-card">
            <div className="food-image"
                style={{
                    backgroundImage: `url(${LoadImage(food.image)})`,
                }}>
            </div>

            <h3>{food.name}</h3>

            <div className="food-price">
                <ul>
                    {food.prices.map((price, key) => 
                        <li key={key}>
                            <Text>{price.size}</Text>
                             <Text>${price.price}</Text>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}