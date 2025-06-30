import { useState,useEffect } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

function ResumeForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    education: { school: '', degree: '', field: '', startYear: '', endYear: '' },
    experience: [{ company: '', role: '', description: '', startYear: '', endYear: '' }],
    projects: [{ title: '', description: '', techStack: '', link: '' }],
    skills: [''],
  });
  useEffect(() => {
  const fetchResume = async () => {
    try {
      const res = await API.get('/resume/me');
      if (res.data) setFormData(res.data);
    } catch (err) {
      if (err.response?.status !== 404)
        console.error('Failed to fetch resume:', err.response?.data || err.message);
    }
  };
  fetchResume();
}, []);

  const handleChange = (e, section, index = null) => {
    const { name, value } = e.target;

    if (section === 'skills') {
      const updatedSkills = [...formData.skills];
      updatedSkills[index] = value;
      setFormData({ ...formData, skills: updatedSkills });
    } else if (section === 'projects' || section === 'experience') {
      const updatedSection = [...formData[section]];
      updatedSection[index][name] = value;
      setFormData({ ...formData, [section]: updatedSection });
    } else {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [name]: value,
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/resume', formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Resume creation failed', err.response?.data || err.message);
    }
  };

  const addSkills = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
  };

  const addProjects = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: '', description: '', techStack: '', link: '' }],
    });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: '', role: '', description: '', startYear: '', endYear: '' }],
    });
  };
   const logOut=()=>{
    window.confirm("Do you want to log Out?")?navigate('/login'):null;
    localStorage.removeItem('token');
  }

  return (
    <>
    <div className='min-h-screen pb-10 bg-gray-200'>
     <div className=' flex justify-between items-center mb-10  bg-white border border-gray-300'>
       <div className="flex items-center">
       <img src="/logo.png" alt="SkillSync Logo" className=" w-18 self-center h-15  pr-2 " ></img>
       <p className='text-blue-500 pl-2  font-serif font-bold text-4xl self-center '>SkillSync</p>
       </div>
       <button className="w-20 h-8  bg-blue-500 mr-6 text-white  rounded hover:bg-blue-600  " type="button" onClick={logOut}>Log Out</button>
    </div>
    
    <div className='bg-white w-[794px] min-h-[300px] mx-auto p-10 shadow-lg rounded-md'>
      <h2 className="text-2xl font-extrabold text-blue-500  pb-2 mb-2">{formData._id ? "Edit Resume" : "Add Resume"}</h2><br/>
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-bold text-blue-500  pb-2 mb-2">Education</h3>
        {['school', 'degree', 'field', 'startYear', 'endYear'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={formData.education[field]}
            onChange={(e) => handleChange(e, 'education')}
  
            className='border border-gray-300 rounded px-4 py-2 w-full mb-4'
          />
        ))}
        <br/><br/>
        <h3 className="text-xl font-bold text-blue-500  pb-2 mb-2">Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index}>
            {['company', 'role', 'description', 'startYear', 'endYear'].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                value={exp[field]}
                onChange={(e) => handleChange(e, 'experience', index)}
                className='border border-gray-300 rounded px-4 py-2 w-full mb-4'
              />
            ))}
          </div>
        ))}
        <button className=" bg-blue-500  text-white min-w-fit p-1 rounded hover:bg-blue-600 " type="button" onClick={addExperience}>+ Add Experience</button><br/><br/>

        <h3 className="text-xl font-bold text-blue-500 pb-2 mb-2">Projects</h3>
        {formData.projects.map((proj, index) => (
          <div key={index}>
            {['title', 'description', 'techStack', 'link'].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                value={proj[field]}
                onChange={(e) => handleChange(e, 'projects', index)}
                className='border border-gray-300 rounded px-4 py-2 w-full mb-4'
              />
            ))}
          </div>
        ))}
        <button className=" bg-blue-500  text-white min-w-fit p-1 rounded hover:bg-blue-600 " type="button" onClick={addProjects}>+ Add Project</button><br/><br/>

        <h3 className="text-xl font-bold text-blue-500  pb-2 mb-2">Skills</h3>
        {formData.skills.map((skill, index) => (
          <input
            key={index}
            placeholder={`Skill ${index + 1}`}
            value={skill}
            onChange={(e) => handleChange(e, 'skills', index)}
            className='border border-gray-300 rounded px-4 py-2 w-full mb-4'
          />
        ))}
        <button className=" bg-blue-500  text-white min-w-fit p-1 rounded hover:bg-blue-600 " type="button" onClick={addSkills}>+ Add Skill</button><br/><br/><br/>

        <button className=" bg-blue-500  text-white min-w-fit p-1 rounded hover:bg-blue-600 " type="submit">Save Resume</button>
      </form>
    </div>
    </div>
    </>
  );
}

export default ResumeForm;
