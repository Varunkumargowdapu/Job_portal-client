import { useAuth } from "../context/AuthContext"
export default function Account() {
    const { user } = useAuth()
    return (
        <div>
            <h2>Account Info</h2>
            { user && (
                <div> 
                    <p>Username - { user.username }</p>
                    <p>Email - { user.email }</p>
                    <p>Role - { user.role }</p>
                </div> 
            )}
            
        </div>
    )
}