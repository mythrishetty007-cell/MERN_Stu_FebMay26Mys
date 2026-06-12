import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

export default function HomePage(){
    return(
        <>
            <Navbar />
            <HeroBanner />
            <section>
                <h2>Recommended Movies</h2>
            <MovieCard/>
            <MovieCard/>
            <MovieCard/>
            </section>
            <Footer />
        </>
    );
}