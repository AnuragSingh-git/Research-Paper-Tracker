import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({children}){

const{

user,

loading

}=useAuth();

if(loading){

return <h1>Loading...</h1>;

}

if(!user){

return <Navigate to="/"/>;

}

return children;

}