// Componente del header para un resumen de la orden
import "../../styles.css";
import LoadImage from "../../util/loadImage";

export default function ResumeHeader({image, header}) {
    return (
        <div className="resume-header">
            <div className="image-header">
                <img src={LoadImage(image)} />
            </div>

            <h3>{header}</h3>
        </div>
    )
}