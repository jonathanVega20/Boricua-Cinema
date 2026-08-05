// Pagina donde el usuario podra
// ver toda su informacion

import { useForm } from "react-hook-form";
import Footer from "../../Footer";
import Header from "../../Header";
import "../../../styles.css";
import ErrorMessage from "../../ErrorMessage";
import { useEffect, useState } from "react";
import Button from "../../Button";
import { useUser } from "../../../context/UserContext";
import OpenEye from "../../../assets/open_eye.png";
import CloseEye from "../../../assets/close_eye.png";
import { validatePassword, isValidEmail, haveSpecialCharacter, haveNumber, haveUpperCase } from "../../../util/validations";
import AllUsersProvider, { useAllUsers } from "../../../context/AllUsersContext";
import { useParams } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import ButtonImage from "../../ButtonImage";
import LoadImage from "../../../util/loadImage";
import WarningMessage from "../../WarningMessage";
import DeletePopup from "../../DeletePopup";

// Pagina con la informacion del usuario 
export default function ManageAccount(){
    return (
        <>
            <AllUsersProvider>
                <ManageAccountInfo />
            </AllUsersProvider>
        </>
    )
}


function ManageAccountInfo(){
    const {id} = useParams();
    const { allUsers, setAllUsers } = useAllUsers();
    const [user, setUser] = useState((id) ? allUsers.find(user => user.id == id) : {});
    const action = (id) ? "Edit Account" : "Add Account";
    const [isEditing, setIsEditing] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [newPasswordEye, setNewPasswordEye] = useState(false);
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
    const [currentPasswordEye, setCurrentPasswordEye] = useState(false);
    const infoForm = useForm();
    const passwordForm = useForm();
    const [warning, setWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");

    // Valores para el formulario de las contraseñas
    const currentPassword = passwordForm.watch("currentPassword");
    const newPassword = passwordForm.watch("newPassword");
    const confirmPassword = passwordForm.watch("confirmPassword");

   // Valores relacionado al eliminar 
   const [deleteItemId, setDeleteItemId] = useState(null);
   const [showPopup, setShowPopup] = useState(false);

    // Incicializa los valores del formulario
    useEffect(() => {
        infoForm.reset({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            role: user.role || "",
            status: user.status || ""
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

        if(isEditing){
            infoForm.reset({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                role: user.role || "",
                status: user.status || ""})
            
        }
                
        setIsEditing(!isEditing);
    }

    // Funcion para solicitar eliminar un showtime
    const requestToDelete = (evt, id) => {
        evt.preventDefault();

        setDeleteItemId(id);
        setShowPopup(true);
    }

    // Funcion para eliminar un showtime
    const deleteItem = (evt) => {
        evt.preventDefault();

        if(deleteItemId)
            setAllUsers(prev => allUsers.filter(account => account.id = deleteItemId))
        else {
            setWarning(true);
            setWarningMessage("We're sorry, there was an error")
        }

        setDeleteItemId(null);
        setShowPopup(false);
    }

    // Funcion para cancelar el elimar un showtime 
    const cancelDelete = (evt) => {
        evt.preventDefault();
        
        setDeleteItemId(null);
        setShowPopup(false);
    }
    return (
        <>
            <Header />
            <main className="profile-page">
                <AdminSidebar />
                <div className="profile-info admin-pages">

                    {/* Formulario para cambiar la informacion de la cuenta */}
                    <h1>{action}</h1>
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

                            <div className="input-form">
                                <label htmlFor="role">Role</label>
                                <select
                                    className="input-select"
                                    {...infoForm.register("role", {
                                        required: "Enter a role",
                                        validate: value => 
                                            value != "" || "Enter a role"
                                    })}
                                    disabled={!isEditing}>
                                    <option value={""}>Select</option>
                                    <option value={"Customer"}>Customer</option>
                                    <option value={"Administrator"}>Administrator</option>
                                </select>

                                <ErrorMessage errors={infoForm.formState.errors.role} />
                            </div>

                            <div className="input-form">
                                <label htmlFor="status">Status</label>
                                <select
                                    className="input-select"
                                    {...infoForm.register("status", {
                                        required: "Enter a status",
                                        setValueAs: value => Number(value),
                                        validate: value => 
                                            value != 0 || "Enter a status"
                                    })}
                                    disabled={!isEditing}>
                                    <option value={0}>Select</option>
                                    <option value={2}>Active</option>
                                    <option value={1}>Inactive</option>
                                </select>
                                        
                                <ErrorMessage errors={infoForm.formState.errors.status} />
                            </div>                            
                        </div>

                        { (warning) ? <WarningMessage message={warningMessage}/> : "" }
                        

                        {
                            // Debo colocar las validaciones del patron
                            (isEditing) ? 
                                <div className="btn-div">
                                    <Button text="Save" classButtonName="btn" type="submit" />
                                    <Button text="Cancel" classButtonName="btn btn-another" onClick={changeEditingMode}/>
                                    <ButtonImage srcImage={LoadImage("trash.png")} classButtonName="delete-btn" onClick={(evt) => requestToDelete(evt, user.id)}/>
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

                {showPopup ? <DeletePopup itemToDelete={"Account"} deleteFunction={deleteItem} cancelDelete={cancelDelete}/> : ""}
                
            </main>
            <Footer />
        </>
    )
}