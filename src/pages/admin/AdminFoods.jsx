// Pagina donde los administradores podras
// manejar todas las comidas

import { useMemo, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../styles.css";
import Search from "../../components/Search";
import Filter from "../../components/Filter";
import SortFilter from "../../components/SortFilter";
import Button from "../../components/Button";
import FoodsProvider, { useFoods } from "../../context/FoodsContext";
import FoodAvailable from "../../components/admin/foods/FoodAvailable";
import { useNavigate } from "react-router-dom";

// Pagina con las comidas que tendra disponible el cine
export default function AdminFoods() {
    return (
        <FoodsProvider>
            <AdminFoodsList />
        </FoodsProvider>
    )
}

// Componente que tendra la lista de todos los alimentos
function AdminFoodsList() {
    const { foods } = useFoods();
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [sort, setSort] = useState("");
    const navigate = useNavigate();

    const foodsFiltered = useMemo(() => {
        const filtered = foods.filter((food, key) => 
            food.type == type || type == "")

        // Filtra lo demas
        return filtered.filter(food => 
                    food.name.toLowerCase().includes(search.toLowerCase()) ||
                    food.type.toLowerCase().includes(search.toLowerCase()) 
                ).sort((a,b) => {
                    if (sort == "asc") return a.name.localeCompare(b.title)
                    else if (sort == "desc") return  b.name.localeCompare(a.title)
                        else null
                })
    }, [search, type, sort])

    return (
        <>
            <Header />
            <main className="profile-page">
                <AdminSidebar />
                <div className="profile-info admin-pages">
                    <h1>Foods</h1>

                    {/* Filtros */}
                    <Search search={search}  onChange={setSearch}/>

                    <div id="history-tool-bar">
                        <div className="filters">
                            <Filter heading="Type" status={type} setValue={setType}>
                                <option value={""}>All</option>
                                <option value={"Food"}>Food</option>
                                <option value={"Drink"}>Drink</option>
                                <option value={"Chocolate"}>Chocolate</option>
                            </Filter>

                            <SortFilter sort={sort} setSort={setSort}/>    
                        </div>

                        <Button text={"+"} classButtonName="btn-add" onClick={() => {navigate("manage")}}/>
                    </div>                    

                    {/* Lista de todas las peliculas */}
                    <div className="foods-list">
                        {(foodsFiltered.length !== 0) ?
                            foodsFiltered.map((food, key) => 
                                    <FoodAvailable key={key} food={food} />)
                            : <h2>There are no food available at the moment.<br/>Please check back later.</h2>
                        }
                    </div>                        
                </div>
            </main>
            <Footer />
        </>
    )
}