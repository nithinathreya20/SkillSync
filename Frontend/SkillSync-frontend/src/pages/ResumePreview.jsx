function ResumePreview({resume}) {
  if(!resume)return <p>Resume not found</p>;
  return (
    <>
    <div className="bg-white w-[794px] min-h-[300px] mx-auto my-6 p-10 shadow-lg rounded-md">
        <section className="mb-6">
          <h3 className="text-xl font-bold text-blue-500 border-b border-gray-200 pb-2 mb-2">Education</h3>
          <p className="text-gray-800 font-medium"><strong>{resume.education.school}</strong>, {resume.education.degree} in {resume.education.field} ({resume.education.startYear} - {resume.education.endYear})</p>
        </section>

        <section className="mb-6">
        <h3 className="text-xl font-bold text-blue-500 border-b border-gray-200 pb-2 mb-2">Experience</h3>
        {resume.experience.filter(exp=>
            exp.company.trim()!==''||
            exp.role.trim()!==''||
            exp.startYear.trim()!==''||
            exp.endYear.trim()!==''||
            exp.description.trim()!==''
        ).map((exp, idx) => (
          <div key={idx}>
            <p className="font-semibold text-gray-800"><strong>{exp.company}</strong> - {exp.role}</p>
            <p className="text-sm text-gray-500">{exp.startYear} to {exp.endYear}</p>
            <p className="text-gray-700">{exp.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-bold text-blue-500 border-b border-gray-200 pb-2 mb-2">Projects</h3>
        {resume.projects.filter(proj =>
          proj.title.trim() !== '' ||
          proj.techStack.trim() !== '' ||
          proj.description.trim() !== '' ||
          proj.link.trim() !== ''
        ).map((proj, idx) => (
          <div key={idx}>
            <p className="font-semibold text-gray-800"><strong>{proj.title}</strong> - {proj.techStack}</p>
            <p className="text-gray-700">{proj.description}</p>
            {proj.link && <a href={proj.link} target="_blank" rel="noreferrer " className="text-blue-500 hover:underline text-sm">Project Link</a>}
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-bold text-blue-500 border-b border-gray-200 pb-2 mb-2">Skills</h3>
        <ul className="list-disc list-inside text-gray-700">
          {resume.skills.filter(skill=>skill.trim()!=='').map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </section>
    </div>
    </>
  )
}

export default ResumePreview