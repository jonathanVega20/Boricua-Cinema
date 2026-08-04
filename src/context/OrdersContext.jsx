// Contexto para obtener las ordenes de la personas

import { createContext, useContext, useState } from "react";

const OrdersContext = createContext();

export default function OrdersProvider(props){
    const [orders, setOrders] = useState([
        {
            id: 1,
            movie: {
                "id": 3,
                "title": "Avatar: Ash and Fire",
                "poster": "movies/avatar.jpg",
                "genre": "Science Fiction",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "duration": "2 hr 45 min",
                "releaseDate": "25 december",
                "status": "1",
                "showtimes": [
                    {
                        "date": "2026-07-13",
                        "hour": "13:00",
                        "language": "Spanish",
                        "roomType": "regular"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "13:30",
                        "language": "English",
                        "roomType": "regular"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "14:20",
                        "language": "English",
                        "roomType": "cxc"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "15:00",
                        "language": "English",
                        "roomType": "vip"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "16:10",
                        "language": "English",
                        "roomType": "imax"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "18:00",
                        "language": "Spanish",
                        "roomType": "regular"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "20:00",
                        "language": "Spanish",
                        "roomType": "fourd"
                    }
                ]
            },
            tickets: [
                    {
                        "type": "children",
                        "amount": 1,
                        "total": 4.71
                    },
                    {
                        "type": "adult",
                        "amount": 2,
                        "total": 16.6
                    },
                    {
                        "type": "senior",
                        "amount": 0,
                        "total": 0
                    }
                ],
            seats: [
                    "J12",
                    "J13",
                    "J14"
                ],
            items: [
                    {
                        "image": "foods/popcorn.png",
                        "name": "Popcorn",
                        "type": "Food",
                        "size": "Big",
                        "price": "7.99",
                        "amount": 1
                    },
                    {
                        "image": "foods/popcorn.png",
                        "name": "Popcorn",
                        "type": "Food",
                        "size": "Small",
                        "price": "2.99",
                        "amount": 1
                    },
                    {
                        "image": "foods/coca_cola.png",
                        "name": "Coca Cola",
                        "type": "Drink",
                        "size": "Small",
                        "price": "1.99",
                        "amount": 1
                    },
                    {
                        "image": "foods/coca_cola.png",
                        "name": "Coca Cola",
                        "type": "Drink",
                        "size": "Medium",
                        "price": "3.99",
                        "amount": 2
                    }
                ],
            payment: {
                "method": "Visa",
                "cardNumber": "1234 1234 1234 1234",
                "expirationDate": "2026-07-19",
                "cardCode": "000"
            }
        },{
            id: 1,
            movie: {
                "id": 3,
                "title": "Star Wars: Revenge of the Siths",
                "poster": "movies/star_wars_rots.jpg",
                "genre": "Science Fiction",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "duration": "2 hr 45 min",
                "releaseDate": "25 december",
                "status": "1",
                "showtimes": [
                    {
                        "date": "2026-07-13",
                        "hour": "13:00",
                        "language": "Spanish",
                        "roomType": "regular"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "13:30",
                        "language": "English",
                        "roomType": "regular"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "14:20",
                        "language": "English",
                        "roomType": "cxc"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "15:00",
                        "language": "English",
                        "roomType": "vip"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "16:10",
                        "language": "English",
                        "roomType": "imax"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "18:00",
                        "language": "Spanish",
                        "roomType": "regular"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "20:00",
                        "language": "Spanish",
                        "roomType": "fourd"
                    }
                ]
            },
            tickets: [
                    {
                        "type": "children",
                        "amount": 1,
                        "total": 4.71
                    },
                    {
                        "type": "adult",
                        "amount": 2,
                        "total": 16.6
                    },
                    {
                        "type": "senior",
                        "amount": 0,
                        "total": 0
                    }
                ],
            seats: [
                    "J12",
                    "J13",
                    "J14"
                ],
            items: [
                    {
                        "image": "foods/popcorn.png",
                        "name": "Popcorn",
                        "type": "Food",
                        "size": "Big",
                        "price": "7.99",
                        "amount": 1
                    },
                    {
                        "image": "foods/popcorn.png",
                        "name": "Popcorn",
                        "type": "Food",
                        "size": "Small",
                        "price": "2.99",
                        "amount": 1
                    },
                    {
                        "image": "foods/coca_cola.png",
                        "name": "Coca Cola",
                        "type": "Drink",
                        "size": "Small",
                        "price": "1.99",
                        "amount": 1
                    },
                    {
                        "image": "foods/coca_cola.png",
                        "name": "Coca Cola",
                        "type": "Drink",
                        "size": "Medium",
                        "price": "3.99",
                        "amount": 2
                    }
                ],
            payment: {
                "method": "Visa",
                "cardNumber": "1234 1234 1234 1234",
                "expirationDate": "2026-07-19",
                "cardCode": "000"
            }
        },{
            id: 1,
            movie: {
                "id": 3,
                "title": "Tron: Ares",
                "poster": "movies/tron.jpg",
                "genre": "Science Fiction",
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "duration": "2 hr 45 min",
                "releaseDate": "25 december",
                "status": "1",
                "showtimes": [
                    {
                        "date": "2026-07-13",
                        "hour": "13:00",
                        "language": "Spanish",
                        "roomType": "regular"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "13:30",
                        "language": "English",
                        "roomType": "regular"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "14:20",
                        "language": "English",
                        "roomType": "cxc"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "15:00",
                        "language": "English",
                        "roomType": "vip"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "16:10",
                        "language": "English",
                        "roomType": "imax"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "18:00",
                        "language": "Spanish",
                        "roomType": "regular"
                    },
                    {
                        "date": "2026-07-13",
                        "hour": "20:00",
                        "language": "Spanish",
                        "roomType": "fourd"
                    }
                ]
            },
            tickets: [
                    {
                        "type": "children",
                        "amount": 1,
                        "total": 4.71
                    },
                    {
                        "type": "adult",
                        "amount": 2,
                        "total": 16.6
                    },
                    {
                        "type": "senior",
                        "amount": 0,
                        "total": 0
                    }
                ],
            seats: [
                    "J12",
                    "J13",
                    "J14"
                ],
            items: [
                    {
                        "image": "foods/popcorn.png",
                        "name": "Popcorn",
                        "type": "Food",
                        "size": "Big",
                        "price": "7.99",
                        "amount": 1
                    },
                    {
                        "image": "foods/popcorn.png",
                        "name": "Popcorn",
                        "type": "Food",
                        "size": "Small",
                        "price": "2.99",
                        "amount": 1
                    },
                    {
                        "image": "foods/coca_cola.png",
                        "name": "Coca Cola",
                        "type": "Drink",
                        "size": "Small",
                        "price": "1.99",
                        "amount": 1
                    },
                    {
                        "image": "foods/coca_cola.png",
                        "name": "Coca Cola",
                        "type": "Drink",
                        "size": "Medium",
                        "price": "3.99",
                        "amount": 2
                    }
                ],
            payment: {
                "method": "Visa",
                "cardNumber": "1234 1234 1234 1234",
                "expirationDate": "2026-07-19",
                "cardCode": "000"
            }
        }
    ]);

    return (
        <OrdersContext.Provider
            value={{orders, setOrders}}>
            {props.children}
        </OrdersContext.Provider>
    )
}

export const useOrders = () => useContext(OrdersContext);

