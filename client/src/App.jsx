import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Category from './pages/Category';
import Info from './pages/Info';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/Login" element={<Login />}/>
            <Route path="/Home" element={<Home />}/>
            <Route path="/Register" element={<Register />}/>
            <Route path="/CreateBlog" element={<CreateBlog />}/>
            <Route path="/About" element={<About />}/>
            <Route path="/Contact" element={<Contact />}/>
            <Route path="/Profile" element={<Profile />}/>
            <Route path="/Category" element={<Category />}/>
            <Route path='/Info' element={<Info/>}/>
            <Route path='/HomePage' element={<HomePage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
