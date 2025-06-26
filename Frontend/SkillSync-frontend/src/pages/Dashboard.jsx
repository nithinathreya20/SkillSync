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
  const deleteResume = async () => {
  if (!window.confirm("Are you sure you want to delete your resume?")) return;

  try {
    await API.delete('/resume');
    setResume(null);
    alert("Resume deleted successfully.");
  } catch (err) {
    console.error("Failed to delete resume", err.response?.data || err.message);
    alert("Error deleting resume.");
  }
};
  if (!user) return <p>Loading user...</p>;

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>

      {resume ? (
        <>
          <h3>Your Resume:</h3>
           <ResumePreview resume={resume}/>
           <Link to='/resume/edit'>Edit Resume</Link>
           <button type='button'onClick={deleteResume}>Delete Resume</button>
        </>
      ) : (
        <Link to="/resume/add">Create Resume</Link>
      )}
      <button type="button" onClick={logOut}>Log Out</button>
    </div>
  );
}

export default Dashboard;
