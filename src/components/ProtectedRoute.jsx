// Componente que muestra el contenido o una pagina 
// de no autorizacion segun el rol que entra 

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute ({ allowedRoles }){
    const { user } = useUser(); 
    const location = useLocation();

    // Si no hay una persona logueada, la redirije al login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si la persona esta en la lista muestra la pagina correspondiente
    const hasPermission = allowedRoles.includes(user.role);

    if (hasPermission) 
        return <Outlet />;
    
    // Si la persona no tiene autorizacion en la pagina 
    // lo redirige a una pagina con un mensaje
    else
        return <Navigate to="/unauthorized" replace />;
};