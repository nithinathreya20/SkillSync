function ResumePreview({resume}) {
  if(!resume)return <p>Resume not found</p>;
  return (
    <div>
        <h2>Resume</h2>
        <section>
          <h3>Education</h3>
          <p><strong>{resume.education.school}</strong>, {resume.education.degree} in {resume.education.field} ({resume.education.startYear} - {resume.education.endYear})</p>
        </section>
        <section>
        <h3>Experience</h3>
        {resume.experience.filter(exp=>
            exp.company.trim()!==''||
            exp.role.trim()!==''||
            exp.startYear.trim()!==''||
            exp.endYear.trim()!==''||
            exp.description.trim()!==''
        ).map((exp, idx) => (
          <div key={idx}>
            <p><strong>{exp.company}</strong> - {exp.role}</p>
            <p>{exp.startYear} to {exp.endYear}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h3>Projects</h3>
        {resume.projects.filter(proj =>
          proj.title.trim() !== '' ||
          proj.techStack.trim() !== '' ||
          proj.description.trim() !== '' ||
          proj.link.trim() !== ''
        ).map((proj, idx) => (
          <div key={idx}>
            <p><strong>{proj.title}</strong> - {proj.techStack}</p>
            <p>{proj.description}</p>
            {proj.link && <a href={proj.link} target="_blank" rel="noreferrer">Project Link</a>}
          </div>
        ))}
      </section>

      <section>
        <h3>Skills</h3>
        <ul>
          {resume.skills.filter(skill=>skill.trim()!=='').map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default ResumePreview