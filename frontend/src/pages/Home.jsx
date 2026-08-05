import Header from "../components/Header";
import Carousel from "../components/homepage/Carousel";
import Footer from "../components/Footer";
import ExperiencesPreview from "../components/homepage/ExperiencesPreview";
import MovieCarousel from "../components/homepage/MovieCarousel";
import MoviesProvider from "../context/MovieContext";
import ExperiencesProvider from "../context/ExperienceContext";

export default function Home() {
    return (
    <>
        <Header />
        <Carousel></Carousel>
        <main id="home">
            <MoviesProvider>
                <MovieCarousel />  
            </MoviesProvider>
                    
            <ExperiencesProvider>
                <ExperiencesPreview /> 
            </ExperiencesProvider>
        </main>
        <Footer />
    </>
    )
}