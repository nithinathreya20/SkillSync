import { useEffect, useState } from "react";
import API from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import ResumePreview from "./ResumePreview";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    API.get('/user/me')
      .then(res => setUser(res.data))
      .catch(err => {
        console.error('Unauthorized', err.response?.data?.msg || err.message);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      });
  }, []);

  useEffect(() => {
    if (user && !resume) {
      API.get('/resume/me')
        .then(res => setResume(res.data))
        .catch(err => {
          console.error("Resume not found", err);
          if (err.response?.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        });
    }
  }, [user, resume]);
  const logOut=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  if (!user) return <p>Loading user...</p>;

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>

      {resume ? (
        <>
          <h3>Your Resume:</h3>
           <ResumePreview resume={resume}/>
        </>
      ) : (
        <Link to="/resume/add">Create Resume</Link>
      )}
      <button type="button" onClick={logOut}>Log Out</button>
    </div>
  );
}

export default Dashboard;
