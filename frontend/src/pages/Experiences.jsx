import Header from '../components/Header';
import Footer from '../components/Footer';
import ExperienceCard from '../components/experiences/ExperienceCard';
import "../styles.css";
import ExperiencesProvider, { useExperiences } from '../context/ExperienceContext';

// Pagina que mostrara todas las experiencias del cine
export default function Experiences() {
    return(
    <>
        <ExperiencesProvider>
            <ExperiencesInformation />
        </ExperiencesProvider>
    </>
    )
}

// Componente que muestra la informaciond de 
// todas las experiencias del cine
function ExperiencesInformation(){
    const {experiences} = useExperiences(); 

    return (
        <>
            <Header />
            <main id="experiences">
                <h1>Experiences</h1>
                <div id='experiences-container'>
                    {experiences.map((experience, key) => 
                        <ExperienceCard key={key} experience={experience}/>
                    )}  
                </div>
            </main>
            <Footer />
        </>
    );
}