import { useAuth } from "../context/AuthContext"
export default function Home() {
    const { user } = useAuth() 
    console.log('home', user)
    return (
        <div>
            <h2>Home Component</h2>
            { !user.isLoggedIn ? <p> user not loggedin </p> : <p>Welcome {user.account.username} </p>}
        </div>
    )
}