import { useEffect, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode} from 'jwt-decode'
import { Navigate } from "react-router-dom";
import api from "../api";



function ProtectedRoute({children}){

    const [isLoggedIn,setIsloggedin] = useState(null)

    useEffect(()=>{
        auth();
    },[])

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsloggedin(false) 
        }else{
            const decoded = jwtDecode(token)
            const now = Date.now() / 1000
            if( decoded.exp > now ){
                setIsloggedin(true)
            }
            else{
                await refresh();
            }
        }
    }

       const refresh = async () => {
        const refresh_token = localStorage.getItem(REFRESH_TOKEN)
        if(!refresh_token){
            setIsloggedin(false)
            return
        }else{
            try{
                const res = await api.post('api/token/refresh/',{
                    refresh: refresh_token
                })
                if(res.status==200){
                    localStorage.setItem(ACCESS_TOKEN,res.data.access)
                    setIsloggedin(true)
                }else{
                    setIsloggedin(false)
                }
            }catch(error){
                console.log(error)
                setIsloggedin(false)
            }
        }
    }

    if(isLoggedIn === null){
        return <div>Loading...</div>
    }

    return isLoggedIn === true ?  children : <Navigate to={'/login'} />

}

export default ProtectedRoute;
