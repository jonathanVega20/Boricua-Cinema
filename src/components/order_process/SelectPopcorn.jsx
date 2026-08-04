// Componente para seleccionar la comunida
// a consumir durante la pelicula

import { useEffect, useState } from "react";
import { useFoods } from "../../context/FoodsContext";
import ItemCard from "./ItemCard";
import MyItemCard from "./MyItemCard";

export default function SelectPopcorn() {
    const {foods} = useFoods();
    const [selectedItems, setSelectedItems] = useState(() =>
        JSON.parse(localStorage.items ?? "[]"));
    const [total, setTotal] = useState(0);

    // Obtiene todos los items disponibles
    useEffect(() => {
        const itemsJson = JSON.stringify(selectedItems);
        localStorage.items = itemsJson;

        setTotal(selectedItems.reduce((count, item) => count + (item.price * item.amount), 0));

    }, [selectedItems])

    return (
        <>
        <div id="select-popcorn">

            {/* Muestra los items que he seleccionado */}
            <div id="my-items-selected">
                <h2>My items</h2>

                {selectedItems.length == 0 ?
                        <p className="not-available-message">No items selected</p>

                    :<table id="my-items-list">
                        <tbody>
                        {
                            selectedItems.map((item, key) => 
                                <MyItemCard key={key}
                                            item={item} 
                                            selectedItems={selectedItems} 
                                            setSelectedItems={setSelectedItems} />
                            )
                        }        
                        </tbody>
                    </table>
                }

                <h4>Total: ${total.toFixed(2)}</h4>
            </div>

            <div className="info-separator"></div>

            {/* Muestra todos los items disponibles */}
            <div id="items-to-select">
                <h2>Select the food</h2>

                <div id="items-list">
                {
                    foods.map((item, key) => 
                        <ItemCard key={key} 
                                  item={item} 
                                  selectedItems={selectedItems}
                                  setSelectedItems={setSelectedItems} />
                    )
                }
                </div>
            </div>
        </div>
        </>
    );
}