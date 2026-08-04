// Contexto para obtener todas las experiencias que 
// brindara el cine
import { createContext, useContext, useState } from "react";

const ExperiencesContext = createContext();

export default function ExperiencesProvider(props) {
    const [experiences, setExperiences] = useState([
        {
            name: "CXC",
            logo: "experiences/cxc_logo.png",
            information: "Caribbean Cinemas Extreme (CXC) is a premium, large*format theater. The theater features a giant screen with high*definition imagery, a 4K projector, a Dolby Atmos™ sound system with up to 128 audio channels, over 30,000 watts of power, and approximately 60 speakers strategically placed 360 degrees around the theater.",
            other: [
                "128 audio channels",
                "Feel the power of sound!",
                "30,000 watts of power",
                "60 speakers",
                "360 degree sound around the theater",
            ]
        },
        {
            name: "IMAX",
            logo: "experiences/imax_logo.png",
            information: "IMAX theaters are characterized by their gigantic screen and surround sound emanating from enormous IMAX speakers strategically placed throughout the auditorium. Likewise, the two giant projectors in these theaters guarantee an optimal image.",
            other: [
                "A mega screen measuring 80 x 54 feet",
                "The most immersive experience",
                "Strategically placed speakers",
            ]
        },
        {
            name: "VIP",
            logo: "experiences/vip_logo.png",
            information: "Our VIP cinemas feature comfortable leather seats that recline at the touch of a button. They are distinguished by the personalized service our customers receive, allowing them to enjoy their favorite food, beer, wine, or cocktails while watching the movie, as our ushers deliver orders inside the theater.",
            other: [
                "Comfortable leather seats",
                "Enjoy your favorite drinks and dishes in your seat",
                "Reclining seats at the touch of a button",
                "Varied menu prepared by our chefs",
            ]
        },
        {
            name: "4DX",
            logo: "experiences/4DX_logo.png",
            information: "4DX technology offers a multisensory experience, stimulating senses such as sight, hearing, smell, and touch with effects synchronized with the film. Comfortable moving seats, smoke effects, water effects, lights, aromas, and optimal image quality are some of the sensations that viewers enjoy in this theater.",
            other: [
                "Sight, hearing, smell, and touch!",
                "A multisensory experience",
                "Moving seats!",
                "Enjoy the effects of smoke, water, and even aromas!",
            ]
        }
    ])

    return (
        <ExperiencesContext.Provider
            value={{experiences, setExperiences}}>
            {props.children}
        </ExperiencesContext.Provider>
    )
}

export const useExperiences = () => useContext(ExperiencesContext);