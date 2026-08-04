// Componente que cambia de favorito a 
// no favorito
import "../../styles.css";
import ButtonImage from "../ButtonImage";
import StarEmpty from "../../assets/empty_star.png";
import StarFill from "../../assets/fill_star.png";
import { useState } from "react";

export default function Star({id = 0, ratingNumber = 0, setStars}){
    const [star, setStar] = useState(false);

    return (
    <>
        {(star || id <= ratingNumber) ? 
            <ButtonImage id={id} srcImage={StarFill} classButtonName="favorite-button" onClick={() =>{
                if(id == 1 && id == ratingNumber)
                    setStars(0)
                else
                    setStars(id)
            } }/> :
            <ButtonImage id={id} srcImage={StarEmpty} classButtonName="favorite-button" onClick={() => setStars(id)}/>
        }
    </>
    )
}