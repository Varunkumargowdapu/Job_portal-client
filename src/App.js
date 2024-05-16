import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from './components/Account';
import AddJob from './components/AddJob';
import ListJobs from './components/ListJobs';
import JobDetail from './components/JobDetail'
import ApplyJob from './components/ApplyJob';
import MyJobs from './components/MyJobs';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/Unauthorized';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';

function App() {
  
  // const { user, handleLogout, handleLogin} = useAuth() 
  const { user, dispatch} = useAuth() 

  const conditionalLinks = (path, roles) => {
    switch(path) {
      case '/add-job' : {
        if(roles.includes(user?.account?.role)) {
          return <Link to={path}>Add Job</Link>
        }
      }
      case '/apply-job' : {
        if(roles.includes(user?.account?.role)) {
          return <Link to={path}>Apply job</Link>
        }
      }
      // case '/my-jobs' : {
      //   if(true) {
      //     return <Link to={path}>My jobs</Link>
      //   }
      // }
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token'))  {
      
      (async () => {
        console.log('app use effect')
        const response = await axios.get('http://localhost:3333/users/account', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        console.log(response.data)
        dispatch({ type: 'LOGIN', payload: { account: response.data } })
      })();
    }
  }, [])

  return (
      <div>
        <h2>Job Portal</h2>
        <Link to="/">Home</Link> |
        <Link to="/list-jobs">List Jobs</Link> | 
        { !user.isLoggedIn ? (
          <>
          
          <Link to="/register">Register</Link> |
          <Link to="/login"> Login </Link> | 
          </>
        ) : (
          <>
            <Link to="/account">Account</Link> | 
            <Link to="/my-jobs">My Jobs</Link> | 
            <Link to="/add-job">Add Jobs</Link> |
            { conditionalLinks('/add-job', ['admin', 'recruiter'])}
            { conditionalLinks('/apply-job', ['admin', 'candidate'])}
            
            
            
             |
            <Link to="/" onClick={() => {
              localStorage.removeItem('token')
              dispatch({ type: 'LOGOUT'})
            }}> logout </Link> | 
          </>
        )}
      
            
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list-jobs" element={<ListJobs />} />
          <Route path="/job-detail/:id" element={<JobDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={
          <PrivateRoute permittedRoles={['recruiter', 'candidate']}>
              <Account />
          </PrivateRoute>} />
          <Route path="/add-job" element={
            <PrivateRoute permittedRoles={['recruiter']}>
              <AddJob />
            </PrivateRoute>
          } />
          <Route path="/my-jobs" element={
            <PrivateRoute permittedRoles={['recruiter']}>
              <MyJobs />
            </PrivateRoute>
          }/>
          <Route path="/apply-job" element={
            <PrivateRoute permittedRoles={['candidate']}>
              <ApplyJob />
            </PrivateRoute>
          } />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
  );
}

export default App;