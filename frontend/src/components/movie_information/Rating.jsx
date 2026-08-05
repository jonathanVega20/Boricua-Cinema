// Componente para que el usuario pueda valorar
// de 1 a 5 estrallas que tanto le gusto la pelicula

import "../../styles.css";
import { useCallback, useEffect, useState } from "react";
import Star from "./Star";
import Text from "../Text";

export default function Rating({number = 3, showText = true}){
    const [stars, setStars] = useState(number);

    return (
        <div id="rating">
            <Star id={1} ratingNumber={stars} setStars={setStars}/>
            <Star id={2} ratingNumber={stars} setStars={setStars}/>
            <Star id={3} ratingNumber={stars} setStars={setStars}/>
            <Star id={4} ratingNumber={stars} setStars={setStars}/>
            <Star id={5} ratingNumber={stars} setStars={setStars}/>

            {showText ? <Text>Rate</Text> : ""}
        </div>
    )
}