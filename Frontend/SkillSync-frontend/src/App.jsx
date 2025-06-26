<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
=======
import { Routes,Route,BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import AddResume from "./pages/AddResume";
import ResumePreview from "./pages/ResumePreview";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}/>
          <Route path='/resume/add' element={<ProtectedRoutes><AddResume/></ProtectedRoutes>}/>
          <Route path='/resume/preview' element={<ProtectedRoutes><ResumePreview/></ProtectedRoutes>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
>>>>>>> b46e14a (Backend and frontend)
