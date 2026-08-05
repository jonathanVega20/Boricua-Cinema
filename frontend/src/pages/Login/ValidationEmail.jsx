//  Pagina para que el cliente pueda iniciar sesion a la pagina

import "../../styles.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Text from "../../components/Text";
import InputText from "../../components/InputText";
import LoadImage from "../../util/loadImage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { isValidEmail } from "../../util/validations";
import ErrorMessage from "../../components/ErrorMessage";
import { useUser } from "../../context/UserContext";

export default function ValidationEmail() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const {
        reset,
        register, 
        handleSubmit,
        formState: {errors}
    } = useForm();

    // Funcion que se ejecutara cuando se someta el formulario
    const onSubmit = (data) => {
        console.log(data)
        let codeGenerate = "";

        // Genera el codigo
        for(let i = 0; i < 6; i++){
            const num = parseInt((Math.random(1)) / 0.1);
            codeGenerate += num;
        }

        if(user.email == data.email){
            console.log(codeGenerate)
            navigate("/login/verify-code", {
                state: {
                    code: codeGenerate,
                    email: data.email.trim()
                }
            })}
        else
            setErrorMessage("The email does not exist")
    }

    return (
        <>
            <main className="login-body">

                <form onSubmit={handleSubmit(onSubmit)} className="login-container cinema-logo">

                    <img src={LoadImage("cinema_logo.png")} alt="Boricua Cinema"/>

                    <h3>Change Password</h3>
                    
                    <Text>You will be sent a validation code to verify your identity</Text>

                    {(errorMessage == "") ? "" : <Text classTextName="error-message">{errorMessage}</Text>}

                    {/* Entrar el correo electronico */}
                    <div className="input-form">
                        <input id="email" type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Enter your email",
                                pattern: {
                                    value: isValidEmail,
                                    message: "Invalid email"
                                }
                            })}/>
                    
                        <ErrorMessage errors={errors.email} />
                    </div>
                    
                    <Button text="Send Code" classButtonName={"btn"} type="submit" /><br />
                </form>
            </main>
        </>
    )
}