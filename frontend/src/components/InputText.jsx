// Este compomente permitira utilizar campos para escribir
// props: el tipo del input, el id del input y el placeholder

export default function InputText(props){
    return (
        <div className="text-input">
            <input type={props.type} id={props.id} placeholder={props.placeholder} />
        </div>
    );
}