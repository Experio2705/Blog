import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/createBlog" element={<CreateBlog />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
