import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

const AuthContext = createContext();


export default AuthContext;


export const AuthProvider = ({ children }) => {
    const [ls, setLS] = useState(null)
    const nav = useRouter();
    useEffect(() => {
        setLS(localStorage.getItem('authTokens'))
        console.log(ls)
    }, [])
    
    if (typeof window !== 'undefined') {
        console.log('You are on the browser')

    }

    let [authTokens, setAuthTokens] = useState(ls ? JSON.parse(ls) : null);
    //As we have user in private Route
    let [user, setUser] = useState(ls ? jwt_decode(ls) : null);
    console.log("USER=", user)
    let [loading, setLoading] = useState(true);


    let loginUser = async (e) => {

        e.preventDefault();                                    
        console.log("FOrm Submitted" + e.target.username.value);
        const type = e.target.logintype.value
        let res = await fetch(`http://127.0.0.1:8000/usertype/${e.target.username.value}/`)
        let user=await res.json()

        if (user.type != type)
            return false
        let response = await fetch(`http://127.0.0.1:8000/api/token/`, {
    
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
        });
    
        let data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));  
            console.log("FOrm Submitted", authTokens, user)
            localStorage.setItem('authTokens', JSON.stringify(data))              
            return true
        }
        else {
            return false
        }
    }

    let registerUser = async (e) => {
        e.preventDefault();
        nav.push(`/register`)

    }


    let updateToken = async (e) => {
        let path=e
        console.log("Update Token Reached")
        let response = await fetch(`http://127.0.0.1:8000/api/token/refresh/`, {

            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })    
        });                                                              

        let data = await response.json();    //  New Token will be generated
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));  //syntax
            localStorage.setItem('authTokens', JSON.stringify(data))
            console.log("PATH=", path)              
            nav.push(path)
        }
        else {                    
            logoutUser();
        }
        if (loading) {
            setLoading(false);
        }
    }
    
    let logoutUser = () => {

        setAuthTokens(null);
        setUser(null);
        console.log("LOGGED OUT", user);
        localStorage.removeItem('authTokens')
        nav.push(`/login`)
    }

    
    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    //Refersh Token 
    useEffect(() => {
        if (loading) {
            updateToken();
        }
        let fourMinutes = 10000 * 60 * 4;   //1000* 60 * 4(default)
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken(nav.asPath)
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [authTokens, loading])


    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

