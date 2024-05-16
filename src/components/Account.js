import { useAuth } from "../context/AuthContext"
import CandidateProfile from "./CandidateProfile"
import RecruiterProfile from "./RecruiterProfile"
export default function Account() {
    const { user } = useAuth() 
    return (
        <div>
            <h2>Account Info</h2>
            { user && (
                <>
                    <p>Username - { user.account.username }</p>
                    <p>email - { user.account.email } </p>
                    <p>Role - { user.account.role }</p>  

                    { user.account.role == 'candidate' ? <CandidateProfile /> : <RecruiterProfile /> }  
                </>
            )}

        </div>
    )
}