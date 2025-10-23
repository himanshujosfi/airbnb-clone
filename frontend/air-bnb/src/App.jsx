import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Register } from './Component/auth/Register'
import { Login } from './Component/auth/Login'
import { Home } from './Component/Pages/Home'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
