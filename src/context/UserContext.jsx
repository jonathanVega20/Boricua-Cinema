// Contexto para guardar el usuario que inicio sesion

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserProvider(props){
    const users = [{
            firstName: "Jonathan",
            lastName: "Vega Rivera",
            email: "jjvega20@yahoo.com",
            password: "L@PruebaCinema1",
            methodPayment: {
                cardNumber: "1234 1234 1234 1234",
                expirationDate: "2026-12-31",
                cardCode: "ABC"
            },
            role: "Customer",
            status: "Active"
        },{
            firstName: "Jonathan",
            lastName: "Vega Rivera",
            email: "jonathan.vega14@upr.edu",
            password: "L@PruebaCinema1",
            methodPayment: {
                cardNumber: "1234 1234 1234 1234",
                expirationDate: "2026-12-31",
                cardCode: "ABC"
            },
            role: "Administrator",
            status: "Active"
        }]

    const [user, setUser] = useState({
            firstName: "Jonathan",
            lastName: "Vega Rivera",
            email: "jjvega20@yahoo.com",
            password: "L@PruebaCinema1",
            methodPayment: {
                cardNumber: "1234 1234 1234 1234",
                expirationDate: "2026-12-31",
                cardCode: "ABC"
            },
            role: "Customer",
            status: "Active"
        })
    
    return (
        <UserContext.Provider
            value={{user, setUser, users}}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);