import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <BrowserRouter>
    <div>
      <h2>Job portal</h2>
      <Link to="/">Home</Link> |
      <Link to="/register">Register</Link> |
      <Link to="/login">Login</Link>

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
