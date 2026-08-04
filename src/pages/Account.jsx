// Pagina donde el usuario podra
// ver toda su informacion

import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AccountSidebar from "../components/profile/AccountSidebar";
import "../styles.css";
import ErrorMessage from "../components/ErrorMessage";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";
import OpenEye from "../assets/open_eye.png";
import CloseEye from "../assets/close_eye.png";
import { validatePassword, isValidEmail, haveSpecialCharacter, haveNumber, haveUpperCase } from "../util/validations";

// Pagina con la informacion del usuario 
export default function Account(){
    const { user, setUser} = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [newPasswordEye, setNewPasswordEye] = useState(false);
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
    const [currentPasswordEye, setCurrentPasswordEye] = useState(false);
    const infoForm = useForm();
    const passwordForm = useForm();

    // Valores para el formulario de las contraseñas
    const currentPassword = passwordForm.watch("currentPassword");
    const newPassword = passwordForm.watch("newPassword");
    const confirmPassword = passwordForm.watch("confirmPassword");

    // Incicializa los valores del formulario
    useEffect(() => {
        infoForm.reset({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
        })
    }, [user])

    // Funcion de la accion que realizara   
    // cuando se someta el formulario
    const onSubmit = (data) => {
        console.log(data);

        setIsEditing(false);
    }   
    
    // Funcion de la accion que realizara   
    // cuando se someta el formulario de 
    // cambiar la contraseña
    const changePasswordSubmit = (data) => {
        console.log(data);

        passwordForm.reset();

        setChangePassword(false);
    }

    // Cambia al modo cambiar contraseña
    const changePasswordMode = (e) => {
        e.preventDefault();

        passwordForm.reset();

        setChangePassword(!changePassword);
    }

    // Cambia al modo editor y viceversa
    const changeEditingMode = (e) => {
        e.preventDefault();

        if(isEditing)
            infoForm.reset({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || ""})
                
        setIsEditing(!isEditing);
    }

    return (
        <>
            <Header />
            <main className="profile-page">
                <AccountSidebar />
                <div className="profile-info">

                    {/* Formulario para cambiar la informacion de la cuenta */}
                    <h1>My Information</h1>
                    <form onSubmit={infoForm.handleSubmit(onSubmit)} noValidate>
                        <div className="my-information-form">
                            <div className="input-form">
                                <label htmlFor="first-name">First Name</label>
                                <input id="first-name" type="text" disabled={!isEditing}
                                    {...infoForm.register("firstName", {
                                        required: "Enter your first name"
                                    })}/>

                                <ErrorMessage errors={infoForm.formState.errors.firstName} />
                            </div>

                            <div className="input-form">
                                <label htmlFor="last-name">Last Name</label>
                                <input id="last-name" type="text" disabled={!isEditing}
                                    {...infoForm.register("lastName", {
                                        required: "Enter your last name"
                                    })}/>

                                <ErrorMessage errors={infoForm.formState.errors.lastName} />
                            </div>

                            <div className="input-form">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" disabled={!isEditing}
                                    {...infoForm.register("email", {
                                        required: "Enter your email",
                                        pattern: {
                                            value: isValidEmail,
                                            message: "Invalid email"
                                        }
                                    })}/>

                                <ErrorMessage errors={infoForm.formState.errors.email} />
                            </div>
                        </div>

                        {
                            // Debo colocar las validaciones del patron
                            (isEditing) ? 
                                <div className="btn-div">
                                    <Button text="Save" classButtonName="btn" type="submit" />
                                    <Button text="Cancel" classButtonName="btn btn-another" onClick={changeEditingMode}/>
                                </div> : <Button text="Edit" classButtonName="btn" onClick={changeEditingMode}/>
                        }
                    </form>

                    {/* Formulario para cambiar la contraseña de la cuenta */}
                    <h2>Change Password</h2>
                    <form onSubmit={passwordForm.handleSubmit(changePasswordSubmit)}>
                        <div className="my-information-form">
                            <div className="input-form password-input">
                                <label htmlFor="current-password">Current Password</label>
                                <input id="current-password" type={currentPasswordEye ? "text" : "password"}
                                    disabled={!changePassword}
                                    {...passwordForm.register("currentPassword", {
                                        required: "Enter the current password"
                                    })}/>

                                {
                                    changePassword ? 
                                        <>
                                        <button onClick={(evt) => {evt.preventDefault(); setCurrentPasswordEye(!currentPasswordEye)}} className="icon-button">
                                            <img src={currentPasswordEye ? CloseEye : OpenEye} alt="Password not visible" />
                                        </button>

                                        <ErrorMessage errors={passwordForm.formState.errors.currentPassword} />
                                        </>
                                        
                                    : ""
                                }
                                
                            </div>

                            <div className="input-form password-input">
                                <label htmlFor="new-password">New Password</label>
                                <input id="new-password" type={newPasswordEye ? "text" : "password"}
                                    disabled={!changePassword}
                                    {...passwordForm.register("newPassword", {
                                        required: "Enter the new password",
                                        validate: value =>
                                            validatePassword(value) || "The password is invalid"
                                    })}/>
                                
                                {
                                    changePassword ? 
                                        <>
                                        <button onClick={(evt) => {evt.preventDefault(); setNewPasswordEye(!newPasswordEye)}} className="icon-button">
                                            <img src={newPasswordEye ? CloseEye : OpenEye} alt="Password not visible" />
                                        </button>

                                        <ErrorMessage errors={passwordForm.formState.errors.newPassword} />
                                        <div className="password-rules">
                                            <h4>Password rules:</h4>
                                            <ul>
                                                <li className={newPassword?.length >= 8 ? "mark" : ""}>Maximum of 8 characters</li>
                                                <li className={haveSpecialCharacter.test(newPassword) ? "mark" : ""}>At least 1 special character</li>
                                                <li className={haveUpperCase.test(newPassword) ? "mark" : ""}>At least 1 capital letter</li>
                                                <li className={haveNumber.test(newPassword) ? "mark" : ""}>At least 1 number</li>
                                            </ul>
                                        </div>
                                        </>
                                        
                                    : ""
                                }
                            </div>

                            <div className="input-form password-input">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input id="confirm-password" type={confirmPasswordEye ? "text" : "password"}
                                    disabled={!changePassword}
                                    {...passwordForm.register("confirmPassword", {
                                        required: "You must confirm the new password",
                                        validate: value => 
                                            (value != newPassword) ? "The password does not match the new one" : true
                                    })}/>

                                {
                                    changePassword ? 
                                        <>
                                        <button onClick={(evt) => {evt.preventDefault(); setConfirmPasswordEye(!confirmPasswordEye)}} className="icon-button">
                                            <img src={confirmPasswordEye ? CloseEye : OpenEye} alt="Password not visible" />
                                        </button>

                                        <ErrorMessage errors={passwordForm.formState.errors.confirmPassword} />
                                        </>
                                        
                                    : ""
                                }
                            </div>

                            
                        </div> 

                        {
                            // Debo colocar las validaciones del patron
                            (changePassword) ? 
                                <div className="btn-div">
                                    <Button text="Save" classButtonName="btn" type="submit"/>
                                    <Button text="Cancel" classButtonName="btn btn-another" onClick={changePasswordMode}/>
                                </div> : <Button text="Change" classButtonName="btn" onClick={changePasswordMode}/>
                        }
                    </form>
                            
                </div>
            </main>
            <Footer />
        </>
    )
}