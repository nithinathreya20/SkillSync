# 📄 SkillSync — Resume Builder Web App

SkillSync is a sleek, full-stack web application that empowers users to create and manage professional resumes with ease. With a clean UI and a user-friendly flow, SkillSync is tailored for students, job seekers, and professionals to craft resumes that stand out.

---

## 🚀 Features

- 📝 **Create & Manage Resume**  
  Add your education, work experience, projects, skills, and more in a structured form.

- 🎨 **Clean Preview Layout**  
  Instantly view a professional resume preview before downloading or sharing.

- 🔐 **Authentication with JWT**  
  Secure user login and registration.

- 🌐 **Responsive UI**  
  Tailwind CSS-powered design that works seamlessly across devices.

- 🧹 **Edit or Delete Resumes Anytime**  
  Full control over resume entries, anytime you want.

---

## 🧰 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Token (JWT)
- Zod (for data validation)

---

## ⚙️ Getting Started

### 1. Clone the Repository

- git clone (https://github.com/nithinathreya20/SkillSync.git)
- cd SkillSync
### 2. Set Up the Backend
- cd Backend
- npm install

Create a .env file in /Backend with:
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key

#### Start the backend server:
- npm start
### 3. Set Up the Frontend
- cd ../Frontend/SkillSync-frontend
- npm install
- npm run dev

## 📬 API Endpoints
- POST /api/register – User Registration
- POST /api/login – User Login
- POST /api/resume/add – Add a Resume
- GET /api/resume/:userId – Get User Resumes
- DELETE /api/resume/:id – Delete a Resume

## 📄 License
This project is licensed under the MIT License.

## 🙌 Acknowledgements
- React

- Tailwind CSS

- Express

- MongoDB

- Zod

- JWT

## 💡 Future Improvements
- PDF download support

- Multiple resume templates

- Drag-and-drop resume builder

- Resume sharing via public links

## 🧑‍💻 Author
**Nithin Athreya** \
[GitHub](https://github.com/nithinathreya20) | [LinkedIn](https://www.linkedin.com/in/nithin-athreya-1807b8320/)
