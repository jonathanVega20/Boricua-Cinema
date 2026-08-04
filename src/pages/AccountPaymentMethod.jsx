// Pagina donde el usuario podra cambiar
// la informacion acarca de su metodo de pago

import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PaymentMethod from "../components/PaymentMethod";
import AccountSidebar from "../components/profile/AccountSidebar";
import "../styles.css";
import { useState } from "react";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";

export default function AccountPaymentMethod() {
    const methods = useForm();
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useUser();

    // Cambia al modo editor y viceversa
    const changeEditingMode = (e) => {
        e.preventDefault();

        setIsEditing(!isEditing);
    }

    // Funcion de la accion que realizara   
    // cuando se someta el formulario
    const onSubmit = (data) => {
        console.log(data);

        setIsEditing(false);
    }   

    return (
        <>
        <Header />
        <main className="profile-page">
            <AccountSidebar />

            <div className="profile-info account-payment-method">
                <h1>Payment Method</h1>
                <PaymentMethod methods={methods} disabled={!isEditing} onSubmit={onSubmit} user={user}/>

                {
                    // Debo colocar las validaciones del patron
                    (isEditing) ? 
                        <div className="btn-div">
                            <Button text="Save" classButtonName="btn" type="submit" onClick={() => methods.handleSubmit(onSubmit)()}/>
                            <Button text="Cancel" classButtonName="btn btn-another" onClick={changeEditingMode}/>
                        </div> : <Button text="Edit" classButtonName="btn" onClick={changeEditingMode}/>
                }
            </div>
        </main>
        <Footer />
        </>
    );
}