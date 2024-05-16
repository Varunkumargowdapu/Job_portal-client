import { useState } from "react"
import axios from 'axios'
import { useAuth } from "../context/AuthContext"
export default function CandidateProfile() {
    const { user, dispatch } = useAuth() 
    console.log('candidate profile', user)
    const [form, setForm] = useState({
        firstName: user.profile ? user.profile.firstName: '',
        lastName: user.profile ? user.profile.lastName: '',
        mobile: user.profile ? user.profile.mobile: '', 
        address: user.profile ? user.profile.address: '',
        clientSideErrors: {},
        isEdit: false, 
        serverSideErrors: null 
    })

    const handleChange = (e) => {
        const { value, name } = e.target 
        setForm({...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        console.log(user.profile)
       if(user.profile) {
        // api to update
        const response = await axios.put('http://localhost:3333/api/candidates/profile', form, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        alert('profile update')
        dispatch({ type: 'SET_PROFILE', payload: response.data})
       } else {
        // api to create 
        const response = await axios.post('http://localhost:3333/api/candidates/profile', form, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        alert('profile created')
        dispatch({ type: 'SET_PROFILE', payload: response.data})
       }
    }

    const handleToggle = () => {
        setForm({...form, isEdit: !form.isEdit })
    }

    return (
        <div>
            <h2>Candidate Profile</h2>
            <button onClick={handleToggle}> { form.isEdit ? 'Cancel' : 'Edit' }</button>
            <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">FirstName</label><br />
                <input 
                    type="text" 
                    value={form.firstName} 
                    onChange={handleChange}
                    name="firstName" 
                    id="firstName"
                    disabled={!form.isEdit}
                /> <br />

                <label htmlFor="lastName">Last name</label><br />
                <input 
                    type="text" 
                    value={form.lastName} 
                    onChange={handleChange}
                    name="lastName" 
                    id="lastName"
                    disabled={!form.isEdit}
                /> <br /> 

                <label htmlFor="mobile">Mobile</label><br />
                <input 
                    type="text" 
                    value={form.mobile} 
                    onChange={handleChange}
                    name="mobile" 
                    id="mobile"
                    disabled={!form.isEdit}
                /> <br /> 

                <label htmlFor="address">Address</label><br />
                <input 
                    type="text" 
                    value={form.address} 
                    onChange={handleChange}
                    name="address" 
                    id="address"
                    disabled={!form.isEdit}
                />
                { form.isEdit && <input type="submit" />  }

            </form>
        </div>
    )
}