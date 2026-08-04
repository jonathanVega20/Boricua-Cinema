import { createContext, useContext, useState } from "react";

const FoodsContext = createContext();

export default function FoodsProvider(props) {
    const [foods, setFoods] = useState([
        {
            id: 1,
            name: "Popcorn",
            image: "foods/popcorn.png",
            quantity: 50,
            prices: [{
                id: 1,
                size: "Small",
                price: "2.99"
            },{
                id: 2,
                size: "Medium",
                price: "4.99"
            },{
                id: 3,
                size: "Big",
                price: "7.99"
            }],
            type: "Food",
            status: 1
        },
        {
            id: 2,
            name: "Nachos",
            image: "foods/nachos.png",
            quantity: 50,
            prices: [{
                id: 1,
                size: "Small",
                price: "2.99"
            },{
                id: 2,
                size: "Medium",
                price: "4.99"
            },{
                id: 3,
                size: "Big",
                price: "7.99"
            }],
            type: "Food",
            status: 1
        },
        {
            id: 3,
            name: "Hot Dog",
            image: "foods/hot_dogs.png",
            quantity: 50,
            prices: [{
                id: 1,
                size: "Small",
                price: "2.99"
            },{
                id: 2,
                size: "Medium",
                price: "4.99"
            },{
                id: 3,
                size: "Big",
                price: "7.99"
            }],
            type: "Food",
            status: 1
        },
        {
            id: 4,
            name: "Coca Cola",
            image: "foods/coca_cola.png",
            quantity: 50,
            prices: [{
                id: 1,
                size: "Small",
                price: "1.99"
            },{
                id: 2,
                size: "Medium",
                price: "3.99"
            },{
                id: 3,
                size: "Big",
                price: "4.99"
            }],
            type: "Drink",
            status: 1
        },
        {
            id: 5,
            name: "Sprite",
            image: "foods/sprite.png",
            quantity: 50,
            prices: [{
                id: 1,
                size: "Small",
                price: "1.99"
            },{
                id: 2,
                size: "Medium",
                price: "3.99"
            },{
                id: 3,
                size: "Big",
                price: "4.99"
            }],
            type: "Drink",
            status: 3
        },
        {
            id: 6,
            name: "Water",
            image: "foods/water.png",
            quantity: 50,
            prices: [{
                id: 1,
                size: "Bottle",
                price: "1.99"
            }],
            type: "Drink",
            status: 1,
        },
        {
            id: 7,
            name: "Snickers",
            image: "foods/snickers.png",
            quantity: 50,
            prices: [{
                id: 1,
                size: "Chocolate",
                price: "2.99"
            }],
            type: "Chocolate",
            status: 1
        },
        {
            id: 8,
            name: "M&M's",
            image: "foods/mm.png",
            quantity: 50,
            prices: [{
                id: 1,
                size: "Chocolate",
                price: "2.99"
            }],
            type: "Chocolate",
            status: 1
        },
        {
            id: 9,
            name: "Twix",
            image: "foods/twix.png",
            quantity: 50,
            prices: [{
                id: 1,
                size: "Chocolate",
                price: "2.99"
            }],
            type: "Chocolate",
            status: 2
        },
    ])

    return (
        <FoodsContext.Provider
            value={{foods, setFoods}}>
            {props.children}
        </FoodsContext.Provider>
    )
}

export const useFoods = () => useContext(FoodsContext);