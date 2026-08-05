// Componente que muestra todos los
// items disponibles

import { useState } from "react";
import "../../styles.css";
import LoadImage from "../../util/loadImage";
import Button from "../Button";

export default function ItemCard({children, item, selectedItems, setSelectedItems}) {
    const [priceSelected, setPriceSelected] = useState({
                                        image: item.image,
                                        name: item.name,
                                        type: item.type,
                                        size: item.prices[0].size,
                                        price: item.prices[0].price,
                                        amount: 1
                                    });

    // Agrega una nueva comida
    const addItem = () => {
        const itemExist = selectedItems.find(item => 
                                (item.name == priceSelected.name) && (item.size == priceSelected.size));

        // Si la comida ya se habia agregado se incrementa 
        // la cantidad, de lo contrario se agrega 
        if(itemExist){
            setSelectedItems(prev => prev.map(item => 
                (item.name == priceSelected.name) && (item.size == priceSelected.size) ? {
                    ...item,
                    amount: item.amount + 1,
                } : item
            ))
        }
        else 
            setSelectedItems(prev => [...prev, priceSelected]);
    }

    return (
        <div className="item-info">
            <div className="item-image"> 
                <img src={LoadImage(item.image)} />
            </div>

            <div className="item-name">
                <h3>{item.name}</h3>
                
                <div className="item-selection">
                {
                    item.prices.map((price, key) => 
                        <div className="item-options" key={key}>
                            <input type="radio" 
                                name={item.name} 
                                className="radio-button"
                                onChange={() => {
                                    setPriceSelected({
                                        image: item.image,
                                        name: item.name,
                                        type: item.type,
                                        size: price.size,
                                        price: price.price,
                                        amount: 1
                                    })
                                }}
                                defaultChecked={((price.size == "Small") || 
                                                 (price.size == "Chocolate") || 
                                                 (price.size == "Bottle")) ? true: false}
                                />

                            <div className="item-prices">
                                <h4>{price.size}</h4>
                                <p>${price.price}</p>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>

            <Button text="+" classButtonName="btn-tickets" onClick={addItem}/>
        </div>
    )
}