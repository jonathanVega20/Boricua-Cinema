// Componente que permite mostrar la informacion de 
// las experiencias que ofrece el cine
import LoadImage from "../../util/loadImage";

export default function ExperienceCard({experience}) {
    return (
        <div className="experience-card">
            <div className="experience-logo"
                style={{
                    backgroundImage: `url(${LoadImage(experience.logo)})`
                }}>
            </div>
            <div className="experience-info">
                <h2>{experience.name}</h2>
                <p>{experience.information}</p>

                <ul>
                    {experience.other.map((info,key) => <li key={key}>{info}</li>)}
                </ul>
            </div>
        </div>
    );
}