// Este componente permite crear un boton con una imagen
// props: nombre del boton, nombre de la clase, accion que tomara
import "../styles.css"

export default function ButtonImage({srcImage, classButtonName="", onClick}) {
    return (
        <button className={classButtonName} onClick={onClick}>
            <img src={srcImage}/></button>
    );
}