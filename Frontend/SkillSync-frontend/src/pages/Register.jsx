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
    const Redirect=()=>
    {
      navigate('/login');
    }
  return (
    <>
    <div className=' flex justify-center bg-gray-200 '>
       <img src="/logo.png" alt="SkillSync Logo" className=" w-18  h-15 self-center pr-2 mt-2" ></img>
       <p className='text-blue-500 pl-2 self-center font-serif font-bold text-4xl '>SkillSync</p>
    </div>
    <div className='min-h-screen flex items-center justify-center flex-col  bg-gray-200 font-sans'>
        
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg mb-2 shadow-md w-full max-w-md '>
        <h2 className='text-2xl font-semibold mb-4 cursor-text'>Register</h2>  
        <input
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
            required 
            className='border border-gray-300 rounded px-4 py-2 w-full mb-4'
        />
        <br />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className='border border-gray-300 rounded px-4 py-2 w-full mb-4'
        />
        <br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className='border border-gray-300 rounded px-4 py-2 w-full mb-4'
        />
        <br />
        <button type="submit" className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>Register</button>

        </form>
        <p className='mt-2 text-sm'>Already a User? <button className='bg-blue-500 text-white py-2 rounded min-w-min hover:bg-blue-600 p-4'type='button' onClick={Redirect}>Sign in</button></p>
    </div>
    </>
  )
}

export default Register