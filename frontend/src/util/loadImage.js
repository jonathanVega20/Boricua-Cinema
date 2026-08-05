// Funcion para cargar las imagenes que estan 
// en el assets del proyect

export default function LoadImage(src) {
    if(!src) return "";

    // Imagenes que estan dentro de otro directorio en particular
    if(src.startsWith("movies"))
        return new URL(`../assets/movies/${src.split('/')[1]}`, import.meta.url).href;
    else if(src.startsWith("carousel"))
        return new URL(`../assets/carousel/${src.split('/')[1]}`, import.meta.url).href;
    else if(src.startsWith("foods"))
        return new URL(`../assets/foods/${src.split('/')[1]}`, import.meta.url).href;
    else if(src.startsWith("experiences"))
        return new URL(`../assets/experiences/${src.split('/')[1]}`, import.meta.url).href;

    // La imagen no tiene un directorio en particular
    else
        return new URL(`../assets/${src}`, import.meta.url).href;
}