// Componente que muestra los 
// items que se ha seleccionado

import "../../styles.css";
import LoadImage from "../../util/loadImage";
import Button from "../Button";

export default function MyItemCard({item, selectedItems, setSelectedItems}) {

    // Decrementa la cantidad de un elemento
    const decrementAmount = () => {
        if((item.amount-1) > 0)
            setSelectedItems(prev => prev.map(p => 
                ((p.name == item.name) && (p.size == item.size)) ? {
                    ...p,
                    amount: p.amount - 1 
                } : p))
        else
            setSelectedItems(prev => prev.filter(p => 
                ((p.name != item.name) || (p.size != item.size))
            ))
    }    

    // Incrementa la cantidad de un elemento
    const incrementAmount = () => {
        setSelectedItems(prev => prev.map(p => 
            (p.name == item.name) && (p.size == item.size) ? {
                ...p,
                amount: p.amount + 1 
            } : p))
    }

    console.log(item)

    return (
        <tr id="item-resume">
            <td className="item-resume-image">
                <img src={LoadImage(item.image)} />
            </td>

            <td>{item.size}</td>

            <td>${item.price * item.amount}</td>

            <td className="increment-same-item">
                <Button text="-" classButtonName="btn-tickets" onClick={decrementAmount}/>
                <p>{item.amount}</p>
                <Button text="+" classButtonName="btn-tickets" onClick={incrementAmount}/>
            </td>
        </tr>
    );
}