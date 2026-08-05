// Componente que tiene un preview de las
// experiencias que ofrece el cine
import { useExperiences } from "../../context/ExperienceContext";
import LoadImage from "../../util/loadImage";

export default function ExperiencesPreview() {
    const {experiences} = useExperiences();

    return (
        <div id="experiences-home">
            <h1>Experiences</h1>
            <div id="experiences-preview">
                {experiences.map((experience, key) => 
                    <div
                        className="experiences-logos"
                        style={{
                            backgroundImage: `url(${LoadImage(experience.logo)}`,
                        }}
                        key={key}>
                    </div>
                )}
            </div>
        </div>
    );
}