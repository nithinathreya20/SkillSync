import { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

function AddResume() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    education: { school: '', degree: '', field: '', startYear: '', endYear: '' },
    experience: [{ company: '', role: '', description: '', startYear: '', endYear: '' }],
    projects: [{ title: '', description: '', techStack: '', link: '' }],
    skills: [''],
  });

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

  return (
    <div>
      <h2>Add Resume</h2>
      <form onSubmit={handleSubmit}>
        <h3>Education</h3>
        {['school', 'degree', 'field', 'startYear', 'endYear'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={formData.education[field]}
            onChange={(e) => handleChange(e, 'education')}
            required
          />
        ))}

        <h3>Experience</h3>
        {formData.experience.map((exp, index) => (
          <div key={index}>
            {['company', 'role', 'description', 'startYear', 'endYear'].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                value={exp[field]}
                onChange={(e) => handleChange(e, 'experience', index)}
              />
            ))}
          </div>
        ))}
        <button type="button" onClick={addExperience}>+ Add Experience</button>

        <h3>Projects</h3>
        {formData.projects.map((proj, index) => (
          <div key={index}>
            {['title', 'description', 'techStack', 'link'].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                value={proj[field]}
                onChange={(e) => handleChange(e, 'projects', index)}
              />
            ))}
          </div>
        ))}
        <button type="button" onClick={addProjects}>+ Add Project</button>

        <h3>Skills</h3>
        {formData.skills.map((skill, index) => (
          <input
            key={index}
            placeholder={`Skill ${index + 1}`}
            value={skill}
            onChange={(e) => handleChange(e, 'skills', index)}
          />
        ))}
        <button type="button" onClick={addSkills}>+ Add Skill</button>

        <button type="submit">Save Resume</button>
      </form>
    </div>
  );
}

export default AddResume;
