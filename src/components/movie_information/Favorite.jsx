// Componente donde el usuario podra
// decir si le gusto o no la pelicula

import { useState } from "react";
import ButtonImage from "../ButtonImage";
import HeartEmpty from "../../assets/heart_empty.png";
import HeartFill from "../../assets/heart_fill.png";
import Text from "../Text";

export default function Favorite({active = false, showText = true}) {
    const [favorite, setFavorite] = useState(active);
    return (
        <div id="favorite">
            {(favorite) ?
                <ButtonImage srcImage={HeartFill} classButtonName="favorite-button" onClick={() => setFavorite(!favorite)}/> :
                <ButtonImage srcImage={HeartEmpty} classButtonName="favorite-button" onClick={() => setFavorite(!favorite)}/>
            }
            {showText ? <Text>Add to Favorite</Text> : "" }
        </div>
    );
}