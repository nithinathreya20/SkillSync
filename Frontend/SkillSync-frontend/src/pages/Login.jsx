import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = res.data;
      console.log('Login success:', user);
      localStorage.setItem('token', token);
      navigate('/dashboard') 
    } catch (err) {
      console.error('Login failed:', err.response?.data?.msg || err.message);
    }
  };
  const Redirect=()=>{
    navigate('/register');
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required/>
        <br />
        <button type="submit">Login</button>
      
     </form>
     <p>New here? <button type='button' onClick={Redirect}>Register</button></p>
    </div>
  
  );
}

export default Login;
