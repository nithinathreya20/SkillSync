import { Routes,Route,BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import ResumePreview from "./pages/ResumePreview";
import ResumeForm from "./pages/ResumeForm";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>}/>
          <Route path='/resume/add' element={<ProtectedRoutes><ResumeForm/></ProtectedRoutes>}/>
          <Route path='/resume/edit' element={<ProtectedRoutes><ResumeForm/></ProtectedRoutes>}/>
          <Route path='/resume/preview' element={<ProtectedRoutes><ResumePreview/></ProtectedRoutes>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
