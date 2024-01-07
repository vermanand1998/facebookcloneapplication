import { Outlet, Navigate } from "react-router";
function Route (){
    const token = localStorage.getItem('token');
    return (token ? <Outlet/> : <Navigate to = {"/"}/> )
        
    }


export default Route;