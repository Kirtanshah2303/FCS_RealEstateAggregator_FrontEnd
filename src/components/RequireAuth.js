import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import {getToken,getUser, removeUserSession } from "../Utils/Common";
const RequireAuth = () => {
    const {auth,setAuth} = useAuth();
    const location = useLocation();
    const[token,setToken] = useState(getToken())
    let idToken,user
    useEffect(() => {
        idToken = getToken()
        user = getUser()
        if(idToken){
            // setAuth({user,idToken})
            setToken(idToken)
            console.log(token)
            // console.log("JSON -->"+JSON.stringify(auth))
        }
    })

    // return (
    //     auth?.roles?.find(role => allowedRoles?.includes(role))
    //         ? <Outlet />
    //         : auth?.user
    //             ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    //             : <Navigate to="/login" state={{ from: location }} replace />
    // );


    return (
            // auth?.idToken
            //     ?<Outlet />
            //     // If the user is not logged in then it redirect to login page
            //     : <Navigate to="/login" state={{ from: location }} replace />
           token
            ?<Outlet />
            // If the user is not logged in then it redirect to login page
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;