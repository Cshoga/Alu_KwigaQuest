# KwigaQuest - Student Dashboard

KwigaQuest is an interactive learning platform designed for students to access lessons, quizzes, challenges, and earn badges in a gamified environment. The student dashboard provides a clean, user-friendly interface with shadow-hover buttons, a side navigation menu, and centered content for optimal readability.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Side Navigation Menu:** Fixed vertical sidebar for easy navigation.
- **Lessons Section:** Displays available lessons with start buttons and descriptions.
- **Quizzes Section:** Interactive quizzes with take quiz buttons.
- **Challenges Section:** Shows progress with visual progress bars and continue buttons.
- **Badges Section:** Earn badges for achievements; visual distinction between earned and locked badges.
- **Responsive UI:** Hover effects with shadows for buttons and cards, centered content for readability.
- **Toast Notifications:** Inform students when they start lessons, take quizzes, or continue challenges.

## Technologies Used
- **Frontend:** React.js
- **Styling:** CSS (with flexbox, hover effects, and shadows)
- **Icons:** Font Awesome
- **State Management:** React hooks (`useState`, `useEffect`)

## Installation
1. Clone the repository:
   git clone https://github.com/Cshoga/Alu_kwigaquest.git
   
2.Navigate into the project directory:
   cd kwigaquest
   cd backend
   
3.Install dependencies:
   pip install -r requirements.txt
   
4.Start the backend server:
   python app.py
the backend will run on port 5000

5. Open a new command prompt and navigate to the frontend
   cd frontend
   
7. install dependencies
   npm install
   
9. start the frontend server:
   npm run dev
   
you should see something like this:
> kwigaquest-frontend@1.0.0 dev
> vite
VITE v5.4.21  ready in 255 ms
➜  Local:   http://localhost:5173/
>  ➜  Network: use --host to expose
> ➜  press h + enter to show help

and start the local host in your browser


## Usage
Open the app in your browser (default: http://localhost:5173)
Explore the sidebar for navigation.
Click on Start Lesson, Take Quiz, or Continue buttons to interact.
View earned badges in the badges section.
Toast notifications will appear for feedback on actions.




