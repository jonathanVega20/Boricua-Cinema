// Este componente permitira utilizar campos para mostrar
// diferentes tipos de mensajes mediantes span
// props: nombre de la clase, y el contenido que contendra

export default function Text(props){
    return (
        <div className="span-text">
            <span className={props.classTextName}>{props.children}</span>
        </div>
    );
}