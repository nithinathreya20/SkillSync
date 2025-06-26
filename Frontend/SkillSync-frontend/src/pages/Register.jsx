import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Register() {
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
    });
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const res=await axios.post('http://localhost:5000/api/auth/register',formData)
            console.log("Registered",res.data);
            navigate('/Dashboard')

            
        }
        catch(err){
            console.error('Registration failed',err.response?.data?.msg ||  err.message)
        }
    }
  return (
    <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
        <input
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            required 
        />
        <br />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Register</button>

        </form>
    </div>
  )
}

export default Register