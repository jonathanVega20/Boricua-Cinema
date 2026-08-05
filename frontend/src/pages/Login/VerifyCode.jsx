//  Pagina para que el cliente pueda iniciar sesion a la pagina

import "../../styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Text from "../../components/Text";
import InputText from "../../components/InputText";
import ResendCode from "../../assets/refresh.png";
import LoadImage from "../../util/loadImage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";

export default function VerifyCode() {
    const {code, email} = useLocation().state;
    const [codeSender, setCodeSender] = useState(code);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    console.log(codeSender);
    
    const {
        register, 
        reset,
        handleSubmit,
        formState: {errors}
    } = useForm();

    // Funcion que se ejecutara cuando se someta el formulario
    const onSubmit = (data) => {
        console.log(data);

        if(data.code.length == 6)
            if(data.code == codeSender){
                reset();
                navigate("/login/change-password")
            }
            else 
                setErrorMessage("Invalid code");
        else
            setErrorMessage("Invalid code");
    }

    // Funcio que reenvia un nuevo codigo
    const resendCode = () => {
        let codeGenerate = "";

        for(let i = 0; i < 6; i++){
            const num = parseInt((Math.random(1)) / 0.1);
            codeGenerate += num;
        }

        setCodeSender(codeGenerate);
        console.log(codeGenerate)
    }

    return (
        <>
            <main className="login-body">

                <form onSubmit={handleSubmit(onSubmit)} className="login-container cinema-logo">

                    <img src={LoadImage("cinema_logo.png")} alt="Boricua Cinema"/>

                    <h3>Change Password</h3>
                    
                    <Text>Enter the code received by email.</Text>

                    {(errorMessage == "") ? "" : <Text classTextName="error-message">{errorMessage}</Text>}

                    <div className="input-form">
                        <input id="code" type="text" maxLength={6}
                            placeholder="000000" {
                                ...register("code", {
                                    required: "Enter the code"
                                })
                            }/>
                        
                        <ErrorMessage errors={errors.code} />
                    </div>

                    {/* Reenvia un nuevo codigo */}
                    <div class="resend-code">
                        <button onClick={resendCode} className="refresh-icon">
                            <img src={ResendCode} alt="Resend code" />
                        </button>
                        <Text>Send another code</Text>
                    </div>

                    <Button text="Confirm" classButtonName={"btn"} type="submit"/><br />
                </form>
            </main>
        </>
    )
}