import { Routes, Route, Link } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from './components/Account';
import AddJob from './components/AddJob';
import ApplyJob from './components/ApplyJob';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './components/Unauthorized';

function App() {
  const { user, handleLogin,  handleLogout } = useAuth() 

  useEffect(() => {
    if(localStorage.getItem('token')) {
      (async () => {
        const response = await axios.get('http://localhost:3333/users/account', { 
          headers : {
            Authorization: localStorage.getItem('token')
          }
        })
        handleLogin(response.data)
      })() 
    }
  }, [])

  return (
      <div>
        <h2>Job Portal</h2>
        <Link to="/">Home</Link> |
            { !user ? (
              <>
                <Link to="/register">Register</Link> |
                <Link to="/login"> Login </Link> | 
              </> 
            ): (
              <>
                  <Link to="/account">Account</Link> |
                  { <Link to="/add-job">Add new Job</Link>} |
                  { <Link to="/apply-job">Apply Job</Link>} |
                  <Link to="/" onClick={() => {
                    localStorage.removeItem('token')
                    handleLogout()
                  }}> Logout </Link> | 
                </> 
            )}
            
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={
            <PrivateRoute permittedRoles={['recruiter', 'candidate']}>
              <Account />
            </PrivateRoute>
          } />
          <Route path="/add-job" element={
            <PrivateRoute permittedRoles={['recruiter']}>
              <AddJob />
            </PrivateRoute>
          } />
          <Route path="/apply-job" element={
            <PrivateRoute permittedRoles={['candidate']}>
              <ApplyJob /> 
            </PrivateRoute>
          } />

          <Route path="/unauthorized" element={<Unauthorized /> } />
        </Routes>
      </div>
  );
}

export default App;