// Contexto para todos los usuarios

import { createContext, useContext, useState } from "react";

const AllUsersContext = createContext();

export default function AllUsersProvider(props){
    const [allUsers, setAllUsers] = useState([{
        id: 1,
        firstName: "Jonathan",
        lastName: "Vega Rivera",
        email: "jjvega20@yahoo.com",
        password: "L@PruebaCinema1",
        methodPayment: {
            cardNumber: "1234 1234 1234 1234",
            expirationDate: "2026-12-31",
            cardCode: "ABC"
        },
        role: "Administrator",
        status: 2
    },{
        id: 2,
        firstName: "Karina",
        lastName: "Vega Rivera",
        email: "karina.vega@yahoo.com",
        password: "L@PruebaCinema1",
        methodPayment: {
            cardNumber: "1234 1234 1234 1234",
            expirationDate: "2026-12-31",
            cardCode: "ABC"
        },
        role: "Customer",
        status: 1
    },{
        id: 3,
        firstName: "Cristal",
        lastName: "Vega Rivera",
        email: "cristal.vega@yahoo.com",
        password: "L@PruebaCinema1",
        methodPayment: {
            cardNumber: "1234 1234 1234 1234",
            expirationDate: "2026-12-31",
            cardCode: "ABC"
        },
        role: "Administrator",
        status: 2
    },{
        id: 4,
        firstName: "Wanda",
        lastName: "Vega Rivera",
        email: "wanda.vega@yahoo.com",
        password: "L@PruebaCinema1",
        methodPayment: {
            cardNumber: "1234 1234 1234 1234",
            expirationDate: "2026-12-31",
            cardCode: "ABC"
        },
        role: "Customer",
        status: 2
    },{
        id: 5,
        firstName: "Luis",
        lastName: "Vega Rivera",
        email: "luis.vega@yahoo.com",
        password: "L@PruebaCinema1",
        methodPayment: {
            cardNumber: "1234 1234 1234 1234",
            expirationDate: "2026-12-31",
            cardCode: "ABC"
        },
        role: "Administrator",
        status: 2
    },])
    
    return (
        <AllUsersContext.Provider
            value={{allUsers, setAllUsers}}>
            {props.children}
        </AllUsersContext.Provider>
    )
}

export const useAllUsers = () => useContext(AllUsersContext);