// Componente con el formulario
// para llenar la informacion de una pelicula

import Header from "../../Header";
import AdminSidebar from "../AdminSidebar";
import Footer from "../../Footer";
import FoodsProvider, { useFoods } from "../../../context/FoodsContext";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../ErrorMessage";
import Button from "../../Button";
import Filter from "../../Filter";
import LoadImage from "../../../util/loadImage";
import ButtonImage from "../../ButtonImage";
import ErrorBubble from "../../ErrorBubble";
import DeletePopup from "../../DeletePopup";
import WarningMessage from "../../WarningMessage";

// Pagina donde se manejara la informacion de la pelicula
export default function ManageFoods() {
    return (
        <FoodsProvider>
            <ManageFoodsInfo />
        </FoodsProvider>
    )
}

// Tendra el formulario para la informacion de la pelicula
function ManageFoodsInfo() {
    const { id } = useParams();
    const { foods, setFoods } = useFoods();
    const action = (id) ? "Edit Food" : "Add Food";
    const uploadRef = useRef();
    const [warning, setWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");

    const [food, setFood] = useState(id ? foods.find(food => food.id == id) : {});
    
   // Valores relacionado al eliminar 
   const [deleteItemId, setDeleteItemId] = useState(null);
   const [showPopup, setShowPopup] = useState(false);
   const [itemToDelete, setItemToDelete] = useState("")

    // Valores relacionados para editar    
    const [isEditing, setIsEditing] = useState(id ? false : true);
    const [editingSize, setEditingSize] = useState(null);
    const editPricesForm = useForm();

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
        watch
    } = useForm();
    
    // Inicializa los valores del formulario
    useEffect(() => {
        reset({
            name: food?.name || "",
            type: food?.type || "",
            image: food?.image || "",
            quantity: food?.quantity || "",
            status: food?.status || "",
        })
    }, [])

    const image = watch("image");

    // Referencia para subir la imagen
    const {
        ref,
        ...imageRegister
    } = register("image", {
        required: id ? false : "Enter the image"
    });

    // Funcion que se ejecuta cuando se someta el formulario
    const onSubmit = (data) => {
        console.log(data)

        setFood(prev => ({
            ...prev,
            name: data.name,
            image: data.image,
            quantity: data.quantity,
            type: data.type,
            status: data.status,
            prices: [...prev.prices]
        }))

        setIsEditing(false);
        setEditingSize(null);
    }

    // Cambia al modo editor y viceversa
    const changeEditingMode = (e) => {
        e.preventDefault();

        if(isEditing){
            reset();
            setWarning(false);
            setWarningMessage("");
        }
                
        setIsEditing(!isEditing);
    }

    // Funcion para añadir un nuevo showtime
    const addPrice = () => {
        setFood({
            ...food,
            prices: [...food.prices , {
                id: food.prices.length + 1,
                size: "",
                price: ""}
            ]
        })
        setEditingSize(food.prices.length)
    }

    // Funcio para editar la informacion del showtime
    const editPrice = (evt) => {
        const values = editPricesForm.getValues().prices[editingSize];

        if((values.size != "") && (values.price != "")){
            setFood(prev => ({
                ...prev,
                prices: prev.prices.map(price => 
                    (price.id == values.id) ? 
                    {
                        ...price,
                        price: values.price,
                        size: values.size,
                    }   : price
                )
            }))
            setEditingSize(null)
        }
        else{
            setWarning(true)
            setWarningMessage("Data is missing")}
    }
    
    // Funcion para cancelar el modo edicion de los showtimes
    const cancelEditPrices = (evt, id) => {
        evt.preventDefault();
        const prices = food.prices.find(price => price.id == id);

        if(!(prices.size && prices.price))
            setFood(prev => ({
                ...prev,
                prices: prev.prices.filter(price => price.id != id)
            }))

        setWarning(false);
        setWarningMessage("");
        setEditingSize(null);
    }

    // Funcion para solicitar eliminar un precio
    const requestToDelete = (evt, id, item) => {
        evt.preventDefault();

        setDeleteItemId(id);
        setShowPopup(true);
        setItemToDelete(item);
    }

    // Funcion para eliminar un precio
    const deleteItem = (evt) => {
        evt.preventDefault();

        if(itemToDelete == "Price")
            setFood(prev => ({
                ...prev,
                prices: prev.prices.filter(price => price.id != deleteItemId)
            }))
        else if(itemToDelete == "Food")
            setFoods(prev => prev.filter(food => food.id != deleteItemId))
        else {
            setWarning(true);
            setWarningMessage("We're sorry, there was an error")
        }

        setDeleteItemId(null);
        setShowPopup(false);
    }    
    
    // Funcion para cancelar el eliminar un precio
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
                    <h1>{action}</h1>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <input id="id" type="hidden" disabled={!isEditing} {...register("id")}/>

                        <div className="inputs-campus">
                            <div className="input-image-poster">
                                <label htmlFor="image" className={`upload-movie-poster ${isEditing ? "" : "disabled"}`}>
                                    <img src={LoadImage(image ? image : "upload_image.png")} 
                                    style={{
                                        width: image == "" ? "100px" : "100%",
                                        margin: "auto"
                                    }}/>
                                </label>

                                <input id="image" type="file" 
                                    disabled={!isEditing} 
                                    hidden
                                    {...imageRegister}
                                    ref={ elem => {
                                        ref(elem);
                                        uploadRef.current = elem;
                                    }}/>

                                <ErrorMessage errors={errors.image} />

                                <Button text={"Upload image"} classButtonName=" btn upload-btn" 
                                    onClick={() => uploadRef.current.click()} disabled={!isEditing}/>
                            </div>
                            <div className="my-information-form">
                                <div className="input-form">
                                    <label htmlFor="name">Name</label>
                                    <input id="name" type="text" disabled={!isEditing}
                                        {...register("name", {
                                            required: "Enter the name"
                                        })}/>

                                    <ErrorMessage errors={errors.name} />
                                </div>

                                <div className="input-form">
                                    <label htmlFor="type">Type</label>
                                    <select
                                        className="input-select"
                                        {...register("type", {
                                            required: "Enter a type",
                                            setValueAs: value => Number(value),
                                            validate: value => 
                                                value != "" || "Enter a type"
                                        })}
                                        disabled={!isEditing}>
                                        <option value={""}>Select</option>
                                        <option value={"Food"}>Food</option>
                                        <option value={"Drink"}>Drink</option>
                                        <option value={"Chocolate"}>Chocolate</option>
                                    </select>
                                        
                                    <ErrorMessage errors={errors.type} />
                                </div>

                                <div className="input-form">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input id="quantity" type="number" disabled={!isEditing}
                                        {...register("quantity", {
                                            required: "Enter the quantity",
                                        })}/>

                                    <ErrorMessage errors={errors.quantity} />
                                </div>

                                <div className="input-form">
                                    <label htmlFor="status">Status</label>
                                    <select
                                        className="input-select"
                                        {...register("status", {
                                            required: "Enter a status",
                                            setValueAs: value => Number(value),
                                            validate: value => 
                                                value != 0 || "Enter a status"
                                        })}
                                        disabled={!isEditing}>
                                        <option value={0}>Select</option>
                                        <option value={1}>Available</option>
                                        <option value={2}>Not available</option>
                                        <option value={3}>Inactive</option>
                                    </select>
                                        
                                    <ErrorMessage errors={errors.status} />
                                </div>
                            </div>
                        </div>
                        
                        <h2>Sizes</h2>    

                        <table className="table-list">
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Price</th>
                                    {isEditing ? <th><Button text={"+"} classButtonName="btn-add" onClick={addPrice}/> </th> : ""}
                                </tr>    
                            </thead>
                            <tbody>
                            {
                                food?.prices?.length > 0 ?
                                    food?.prices.map((price, key) =>
                                        <tr key={key}>
                                            <td>
                                            {
                                                editingSize === key ?
                                                <>
                                                    <input id="id" defaultValue={price.id} 
                                                        {...editPricesForm.register(`prices.${key}.id`, {
                                                            setValueAs: value => Number(value)
                                                        })} hidden/>

                                                    <div className="showtime-error-div">
                                                        <input id="size" defaultValue={price.size}
                                                            {...editPricesForm.register(`prices.${key}.size`, {
                                                                validate: value => 
                                                                    value === "" 
                                                                    ? "Enter a size"
                                                                    : true
                                                            })}/>
                                                        
                                                        <ErrorBubble error={editPricesForm.formState.errors.prices?.[editingSize]?.size?.message}/>
                                                    </div>
                                                </> : price.size
                                            }
                                            </td>
                                            <td>
                                            {
                                                editingSize === key ?
                                                <div className="showtime-error-div">
                                                    <input id="price" defaultValue={price.price}
                                                        {...editPricesForm.register(`prices.${key}.price`, {
                                                            validate: value => 
                                                                value === "" 
                                                                ? "Enter a price"
                                                                : true
                                                        })}/>
                                                    
                                                    <ErrorBubble error={editPricesForm.formState.errors.prices?.[editingSize]?.price?.message}/>
                                                </div>
                                                : "$" + price.price
                                            }
                                            </td>
                                            {isEditing ? 
                                                <td className="edit-showtime">
                                                    {
                                                        editingSize === key ? 
                                                        <>
                                                            <Button text={"Save"} classButtonName="btn" 
                                                                onClick={(evt) => {evt.preventDefault();editPricesForm.handleSubmit(editPrice)()}}
                                                                />
                                                            <Button text={"Cancel"} classButtonName="btn btn-another" 
                                                                onClick={(evt) => cancelEditPrices(evt, price.id)}
                                                                />
                                                        </>
                                                        :
                                                        <>
                                                            <ButtonImage srcImage={LoadImage("edit.png")} classButtonName="trash-btn" 
                                                                onClick={() => setEditingSize(key)}/>
                                                            <ButtonImage srcImage={LoadImage("trash.png")} classButtonName="trash-btn" 
                                                                onClick={(evt) => {requestToDelete(evt, price.id, "Price")}}
                                                                />    
                                                        </>
                                                    }
                                                </td> : ""
                                            }
                                        </tr> 
                                    )
                                : <tr><td className="not-available-table-message" colSpan={3}>Sizes not available</td></tr>
                            }
                            </tbody>
                        </table>    

                        { (warning) ? <WarningMessage message={warningMessage}/> : "" }

                        {
                            // Debo colocar las validaciones del patron
                            (isEditing) ? 
                                <div className="btn-div">
                                    <Button text="Save" classButtonName="btn" type="submit" />
                                    <Button text="Cancel" classButtonName="btn btn-another" onClick={changeEditingMode}/>
                                    <ButtonImage srcImage={LoadImage("trash.png")} classButtonName="delete-btn" onClick={(evt) =>  requestToDelete(evt, food.id, "Food")}/>
                                </div> : <Button text="Edit" classButtonName="btn" onClick={changeEditingMode}/>
                        }
                    </form>
                </div>

                {showPopup ? <DeletePopup itemToDelete={(itemToDelete == "Price") ? "Price" : "Food"} deleteFunction={deleteItem} cancelDelete={cancelDelete}/> : ""}
                
            </main>
            <Footer />
        </>
    )    
}