//  Pagina para que el cliente pueda iniciar sesion a la pagina

import "../../styles.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Text from "../../components/Text";
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import LoadImage from "../../util/loadImage";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { useState } from "react";
import OpenEye from "../../assets/open_eye.png";
import CloseEye from "../../assets/close_eye.png";
import { useUser } from "../../context/UserContext";
import { isValidEmail } from "../../util/validations";

export default function Login() {
    const {user} = useUser();
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [passwordEye, setPasswordEye] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    // Funcion que realizara cuando se someta el formulario
    const onSubmit = (data) => {
        console.log(data);

        if(user.email === data.email && user.password === data.password){
            reset();
            navigate("/");
        }
        else
            setErrorMessage("The email or password are incorrect")
    }

    return (
        <>
            <main className="login-body">

                <form onSubmit={handleSubmit(onSubmit)} className="login-container cinema-logo" noValidate>

                    <img src={LoadImage("cinema_logo.png")} alt="Boricua Cinema"/>

                    <h3>Log In</h3>

                    {(errorMessage == "") ? "" : <Text classTextName="error-message">{errorMessage}</Text>}

                    {/* Input para el correo electronico */}
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

                    {/* Input para la contraseña */}
                    <div className="input-form password-input">
                        <input id="password" type={passwordEye ? "text" : "password"}
                        placeholder="Password"
                            {...register("password", {
                                required: "Enter the password"
                            })}/>
                    
                        <button onClick={(evt) => {evt.preventDefault(); setPasswordEye(!passwordEye)}} className="icon-button">
                            <img src={passwordEye ? CloseEye : OpenEye} alt="Password not visible" />
                        </button>
                    
                        <ErrorMessage errors={errors.password} />
                                                    
                    </div>

                    <Button text="Log In" classButtonName={"btn"} type="submit"/><br />

                    {/* Link para cambiar la contraseña */}
                    <Link to="validation-email">Forgot password?</Link><br />

                    <hr />

                    {/* Link para crear una cuenta nueva */}
                    <Text>
                        Don&apos;t have an account? &nbsp; 
                        <Link to="/create-account" className="link-color">Create an account</Link>
                    </Text>
                </form>
            </main>
        </>
    )
}
