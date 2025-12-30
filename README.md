# TaskApp – React Task Management Application

TaskApp is a modular and scalable task management application built using React.  
It demonstrates clean UI/UX, structured frontend architecture, mock backend integration, and basic security practices suitable for academic and internship evaluation.


##  Features

- User authentication (login & registration)
- Task creation, update, deletion
- Task filtering and search
- Responsive dashboard UI
- Modular and scalable code structure


##  UI / UX & Responsiveness

- Clean and modern UI with consistent spacing and typography
- Fully responsive layouts for desktop and mobile screens
- Reusable UI components (Button, Input, Alert, Modal)
- Smooth user interactions with loading states and validations


##  Frontend & Backend Integration

- Frontend interacts with a mock backend service (`api.js`)
- API layer abstracts all data operations
- Session-based persistence using `sessionStorage`
- Easily replaceable with real REST APIs in the future

---

##  Security Practices

- Password validation enforced during authentication
- Token-based authentication mechanism
- Token expiry handling on application load
- Protected routes using authentication context
- Centralized auth state management via React Context

> Note: Password hashing and server-side validation can be added seamlessly when integrating a real backend.

---

##  Code Quality & Documentation

- Clean separation of concerns (components, context, API, pages)
- Reusable and maintainable components
- Meaningful commit messages
- Readable and consistent code style
- Clear file naming conventions

---

##  Scalability & Architecture

The project is structured to scale easily:

