import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function ListJobs(){
    const [jobs,setJobs] = useState([]) 
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:3333/api/jobs')
                setJobs(response.data)
            } catch(err) {
                alert(err) 
            }
        })();
    }, [])
    return (
        <div>
            <h2>Listing Jobs - { jobs.length } </h2>
            <ul>
                { jobs.map((ele) => {
                    return <li key={ele._id}><Link to={`/job-detail/${ele._id}`}>{ ele.title }</Link></li>
                })}
            </ul>
        </div>
    )
}