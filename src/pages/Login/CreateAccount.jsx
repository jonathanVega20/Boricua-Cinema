//  Pagina para que el cliente pueda iniciar sesion a la pagina

import "../../styles.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Text from "../../components/Text";
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import LoadImage from "../../util/loadImage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import OpenEye from "../../assets/open_eye.png";
import CloseEye from "../../assets/close_eye.png";
import { useUser } from "../../context/UserContext";
import { validatePassword, isValidEmail, haveSpecialCharacter, haveNumber, haveUpperCase } from "../../util/validations";

export default function Register() {
    const { user } = useUser();
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [passwordEye, setPasswordEye] = useState(false);
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
        watch
    } = useForm();    

    const password = watch("password");

    // Funcion para ejecutar luego de que se 
    // envie el formulario
    const onSubmit = (data) => {
        console.log(data);

        if(user.email != data.email)
            navigate("/login")
        else 
            setErrorMessage("The email already exist")
    }

    return (
        <>
            <main className="login-body">

                <form onSubmit={handleSubmit(onSubmit)} className="login-container cinema-logo">

                    <img src={LoadImage("cinema_logo.png")} alt="Boricua Cinema"/>

                    <h3>Create Account</h3>

                    {(errorMessage == "") ? "" : <Text classTextName="error-message">{errorMessage}</Text>}

                    {/* Entrar el el nombre y apellidos */}
                    <div className="my-information-form">
                        <div className="input-form">
                            <input id="firt-name" type="text"
                                placeholder="First Name"
                                {...register("firstName", {
                                    required: "Enter your first name",
                                })}/>
                        
                            <ErrorMessage errors={errors.firstName} />
                        </div>
                        <div className="input-form">
                            <input id="last-name" type="text"
                                placeholder="Last Name"
                                {...register("lastName", {
                                    required: "Enter your last name",
                                })}/>
                        
                            <ErrorMessage errors={errors.lastName} />
                        </div>
                    </div>

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

                    {/* Entrar la contraseña y confirmarla */}
                    <div className="input-form password-input">
                        <input id="password" type={passwordEye ? "text" : "password"}
                        placeholder="Password"
                            {...register("password", {
                                required: "Enter the password",
                                validate: value =>
                                            validatePassword(value) || "The password is invalid"
                            })}/>
                    
                        <button onClick={(evt) => {evt.preventDefault(); setPasswordEye(!passwordEye)}} className="icon-button">
                            <img src={passwordEye ? CloseEye : OpenEye} alt="Password not visible" />
                        </button>
                    
                        <ErrorMessage errors={errors.password} />

                        <div className="password-rules">
                            <h4>Password rules:</h4>
                            <ul>
                                <li className={password?.length >= 8 ? "mark" : ""}>Maximum of 8 characters</li>
                                <li className={haveSpecialCharacter.test(password) ? "mark" : ""}>At least 1 special character</li>
                                <li className={haveUpperCase.test(password) ? "mark" : ""}>At least 1 capital letter</li>
                                <li className={haveNumber.test(password) ? "mark" : ""}>At least 1 number</li>
                            </ul>
                        </div>
                    </div>                    
                    
                    <div className="input-form password-input">
                        <input id="confirmPassword" type={confirmPasswordEye ? "text" : "password"}
                        placeholder="Confirm Password"
                            {...register("confirmPassword", {
                                required: "Enter the password",
                                validate: value => 
                                    (value != password) ? "The password does not match the new one" : true
                            })}/>
                    
                        <button onClick={(evt) => {evt.preventDefault(); setConfirmPasswordEye(!confirmPasswordEye)}} className="icon-button">
                            <img src={confirmPasswordEye ? CloseEye : OpenEye} alt="Password not visible" />
                        </button>
                    
                        <ErrorMessage errors={errors.confirmPassword} />
                                                    
                    </div>
                    
                    <Button text="Create" classButtonName={"btn"} type="submit"/><br />

                    <hr />

                    {/* Link para inciar sesion si es que ya tiene una cuenta */}
                    <Text>
                        Do you have an account? &nbsp; 
                        <Link to="/login" className="link-color">Log In</Link>
                    </Text>
                </form>
            </main>
        </>
    )
}
