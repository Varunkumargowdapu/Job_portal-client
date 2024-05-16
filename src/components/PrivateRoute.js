import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ permittedRoles, children}){
    const { user } = useAuth() 
    console.log('pr', user)
    
    if(!user.isLoggedIn && localStorage.getItem('token')) {
        return <p>loading...</p>
    }

    if(!user.isLoggedIn) {
        return <Navigate to="/login" /> 
    }

    if(!permittedRoles.includes(user.account.role)) {
        return <Navigate to="/unauthorized" />
    }

    return children
}

// user = null or { email, role } 
// user = { isLoggedIn: false, account: null, profile: null }  or { isLoggedIn: true, account: { username, email, role}, profile: { }}

// From front end to back end, there are so many steps we have to remember all at once. Are there any guidelines we can follow to remember all these steps?


/*
    1. Setup navigation links 
    2. Register Component
        -> controlled component 
        -> event handlers - handleChange + handleSubmit
        -> client side validations
        -> api call to register user
        -> server side validations 
        -> redirect the user 
    3. Auth Context Provider Component 
        -> createContext
        -> useAuth custom Hook
        -> AuthProvider Component 
        -> reducer -> LOGIN, LOGOUT etc 
        -> createState using useReducer hook 
        -> Passing state + dispatch through the Provider 
    4. Login Component
        -> controlled component
        -> event handlers
        -> client side validations
        -> api call to login user
        -> if valid 
            -> token to localStorage
            -> api call to get user account info
            -> update the user login status - useReducer + context API - user { }
            -> redirect the user 
        -> else 
            -> display server errors 
    5. Update Navigation links on the UI
    6. Secure routes based on login status as well as role 
*/