import Header from "../components/Header";
import Footer from "../components/Footer";
import Search from "../components/Search";
import FoodCard from "../components/menu/FoodCard";
import { useState, useMemo } from "react";
import FoodsProvider, {useFoods} from "../context/FoodsContext";

// Pagina que muestra el menu del cine
export default function Menu() {
    return(
        <FoodsProvider>
            <MenuFoods />
        </FoodsProvider>
    )
}

// Muestra todas las comidas que brinda el cine
export function MenuFoods(){
    const {foods} = useFoods();
    const [search, setSearch] = useState("");

    // Filtra las comidas
    const filteredFoods = useMemo(() => {
        return foods.filter(food =>
                food.name.toLowerCase().includes(search.toLowerCase()) ||
                food.type.toLowerCase().includes(search.toLowerCase())
            )
    }, [search])

    return (
        <>
            <Header />
            <main id="food-menu">
                <h1>Menu</h1>
                <Search value={search} onChange={setSearch}/>
                <div id="food-menu-container">
                    {(filteredFoods.length !== 0) ?
                        filteredFoods.map((food, key) => 
                            <FoodCard key={key} food={food} />
                        ) : <h2>There are no results related to your search.</h2>
                    }
                </div>
            </main>
            <Footer />
        </>
    );
}