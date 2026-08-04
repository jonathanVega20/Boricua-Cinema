// Componente para las diferentes metodos de pago

import { useEffect, useState } from "react";
import "../styles.css";
import LoadImage from "../util/loadImage";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function PaymentMethod({methods, 
                                       onSubmit, 
                                       disabled = false,
                                       user=null,
                                       page=""}) {
    const [paymentMethod, setPaymentMethod] = useState("Visa");
    const today = new Date().toISOString().split("T")[0];
    const [cardFormat, setCardFormat] = useState(0);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit, 
        reset, 
        watch,
        formState: {errors},
        setValue
    } = methods;

    // Si ya el usuario tiene una cuenta coloca el la misma informacion
    useEffect(() => {
        reset({
            cardNumber: user.methodPayment.cardNumber || "",
            expirationDate: user.methodPayment.expirationDate || "",
            cardCode: user.methodPayment.cardCode || "",
        })
    }, [])

    // Coloca el numero de la tarjeta en el formato correcto
    const cardNumberFormat = (e) => {
        let value = e.target.value;

        // Elimina todo los que no es numero
        value = value.replace(/\D/g, "");

        // Máximo 16 dígitos
        value = value.substring(0, 16);

        // Agrega un espacio cada 4 dígitos
        value = value.replace(/(\d{4})(?=\d)/g, "$1 ");

        e.target.value = value;
    }

    // Funcion que dirige a la pagina de paypal
    const goToPaypal = () => {
        window.open("https://www.paypal.com/signin?returnUri=https%3A%2F%2Fwww.paypal.com%2Fmyaccount%2Fsummary&state=&YWRzZGRjYXB0Y2hh=1",
            "_blank",
            "width=600,height=700"
        );
    }

    return (
        <>
        {/* Opciones de pagos disponibles */}
        <div className="payment-method-options">
            <div className={`payment-options left-payment-option ${paymentMethod == "Visa" ? "payment-selected" : ""}`}
                onClick={() => setPaymentMethod("Visa")}>
                <img src={LoadImage("visa.png")} />
            </div>
            {
                (page == "Checkout") ? 
                <>
                    <div className="div-separator"></div>
                    <div className={`payment-options right-payment-option ${paymentMethod == "PayPal" ? "payment-selected" : ""}`}
                        onClick={() => setPaymentMethod("PayPal")}>
                        <img src={LoadImage("paypal-logo.png")} />
                    </div>
                </> : ""
            }
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="payment-method-form" noValidate>
            <input type="hidden"  value={paymentMethod} {
                ...register("method")
            }/>
        {    // Metodo de pago con VISA
            (paymentMethod == "Visa") ? 
                <div>
                    {/* Numero de la tarjeta */}
                    <div className="input-form">
                        <label htmlFor="card-number">Card Number</label>
                        <input id="card-number" type="text" 
                            disabled={disabled}
                            placeholder="0000 0000 0000 0000"
                            pattern=""
                            maxLength={19}
                        {
                            ...register("cardNumber", {
                                    required: "Enter a card number",
                                    pattern: {
                                        value: /^[\d ]*$/,
                                        message: "Must be a number"
                                    }
                                }
                            )
                        }
                            onInput={cardNumberFormat}
                        />
                        <ErrorMessage errors={errors.cardNumber}/>    
                    </div>
                    
                    <div className="input-row">
                        {/* Fecha de expiracion de la tarjeta */}
                        <div className="input-form">
                            <label htmlFor="expiration-date">Expiration Date</label>
                            <input id="expiration-date" type="date" 
                                disabled={disabled}
                            {
                                ...register("expirationDate", {
                                        required: "Enter the expiration date",
                                        min: {
                                            value: today,
                                            message: "The card has already expired"
                                        }
                                    }
                                )
                            }/>
                            <ErrorMessage errors={errors.expirationDate}/>    
                        </div>

                        {/* Numero de seguridad de la tarjeta */}
                        <div className="input-form">
                            <label htmlFor="card-code">CVV</label>
                            <input id="card-code" type="text" 
                                placeholder="***"
                                maxLength={3}
                                disabled={disabled}
                            {
                                ...register("cardCode", {
                                        required: "Enter the security code"
                                    }
                                )
                            }/>
                            <ErrorMessage errors={errors.cardCode}/>    
                        </div>
                    </div>
                </div>
            :   (page == "Checkout") ?
                // Enlace para pagar con Paypal
                <div className="paypal-div">
                    <Button text={"PayPal"} classButtonName="paypal-button" onClick={goToPaypal} disabled={disabled} />
                </div> : ""
        }
        </form>
        </>
    )
}