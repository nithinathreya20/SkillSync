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
    window.confirm("Do you want to log Out?")?navigate('/login'):null;
    localStorage.removeItem('token');
    //navigate('/login');
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
    <>
    <div className=' flex justify-between items-center  bg-white border border-gray-300'>
       <div className="flex items-center">
       <img src="/logo.png" alt="SkillSync Logo" className=" w-18 self-center h-15  pr-2 " ></img>
       <p className='text-blue-500 pl-2  font-serif font-bold text-4xl self-center '>SkillSync</p>
       </div>
       <button className="w-20 h-8  bg-blue-500 mr-6 text-white  rounded hover:bg-blue-600  " type="button" onClick={logOut}>Log Out</button>
    </div>
    <div className="bg-gray-200 min-h-screen">
      <h2 className="text-center text-blue-500 text-5xl font-serif pt-3">Welcome, {user.name}!</h2>


      {resume ? (
        <>
          <h3 className="text-blue-500 text-3xl pl-3">Your Resume:</h3>
           <div className=" flex flex-col items-center ">
           <div className=" pb-8"><ResumePreview resume={resume}/></div>
           <div className="self-start my-3 mx-3">
           <button className=" bg-blue-500 mr-4 text-white min-w-fit p-2 rounded hover:bg-blue-600 " onClick={()=>{navigate('/resume/edit')} }>Edit Resume</button>
           <button className=" min-w-fit   bg-blue-500 mr-6 text-white p-2  rounded hover:bg-blue-600 " type='button'onClick={deleteResume}>Delete Resume</button>
           </div>
           </div>
        </>
      ) : (
        <Link to="/resume/add">Create Resume</Link>
      )}
     
    </div>
  </>
  );
  
}

export default Dashboard;
