// Este componente permitira utilizar un carrusel con diferentes imagenes

import { useEffect, useState } from "react";
import "../../styles.css";
import LoadImage from "../../util/loadImage";

export default function Carousel() {
    const posters = [
        "carousel/poster_starwars.jpg",
        "carousel/poster_avatar.jpeg",
        "carousel/poster_final_freddy.jpeg",
        "carousel/poster_zootopia.jpeg"
    ];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // Funcion que ira cambiando el indice de las 
        // imagenes cada que vez que pasen 10 segundos
        const interval = setInterval(() => {
            setIndex(prev => 
                (prev == posters.length - 1) ? 0 : prev + 1
            );
        }, 10000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div id="posters-carousel"
            style={{
                backgroundImage: `url(${LoadImage(posters[index])})`,
            }}>
        </div>
    );
}