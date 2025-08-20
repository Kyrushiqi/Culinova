# Culinova 
Welcome to Culinova, a website for people who love to cook and eat. Our goal is to make finding recipes simple and fun for everyone.

**What We Offer**

**Create & Share Your Recipes** <br>
You can save your own recipes and share them with a community of fellow food lovers.

**Find Recipes Easily** <br>
Our special "With/Without" search feature lets you find recipes based on the ingredients you have. Just tell us what you want to include and what you want to avoid. It’s a great way to discover new recipes using what's already in your kitchen.

# Setup & Installation Guide
**Prerequisites**

* **Node.js**: Ensure you have Node.js (v14 or higher) installed.

* **MongoDB**: A running instance of a MongoDB database. You can use a local installation or a cloud service like MongoDB Atlas.

* **Git**: Git must be installed to clone the repository.

**Step 1: Clone the Repository** <br>
Clone the project from your Git repository to your local machine. In the terminal:
```
git clone https://github.com/Kyrushiqi/Culinova.git

cd Culinova
```
**Step 2: Backend Setup** <br>
Navigate into the server directory and install the dependencies.
```
cd server

npm install
```
Create a `.env` file in the `server` directory and add your environment variables. Get these from MongoDB.
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the backend server. The console should say the following: <br>
Server is running on port 8000 <br>
Database connected
```
npm start
```

**Step 3: Frontend Setup** <br>
Open a new terminal, navigate to the `client` directory, install the dependencies, and start the frontend development server. The frontend application will start on `http://localhost:5173/`. You can now access the application in your web browser.
```
cd client

npm install

npm run dev
```

# File Structure
The project is organized into two main directories: `client` and `server`, each with its own specific files and folders.
```
Culinova/
├── client/
│   ├── context/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── recipeService.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .eslintrc.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── server/
│   ├── controllers/
│   │   ├── authControllers.js
│   │   └── recipeControllers.js
│   ├── helpers/
│   │   └── auth.js
│   ├── models/
│   │   ├── recipe.js
│   │   └── user.js
│   ├── node_modules/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── recipeRoutes.js
│   ├── .env
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
└── vite.config.js
```
# Information
* [Documentation](https://docs.google.com/document/d/1OWTMUgg_lDDDjA3NslO464Ke_Jtwfb3ml6V6TtVg3ZY/edit?usp=sharing)
* [Figma Wireframe](https://www.figma.com/design/8wGqoT1HmXb9iiTF0aCTGQ/Culinova?node-id=0-1&t=yPBb648nIppyQ9Js-0)
* [Presentation](https://docs.google.com/presentation/d/19uOZfmaeAYcpRH86Pm5PgHWhMf2M5hJlpagelfmsdE8/edit?usp=sharing)


## Team Chimpanzee:

| Team      | Role          | Github  | Introductions |
| --------- |:-------------| :-------| --------------|
| Karina Lam| Frontend Dev, UI/UX Designer | https://github.com/Kyrushiqi | [Karina's Intro](Introductions/Karina.html)
| Jessica Lei| Project Manager, Backend Dev | https://github.com/jessicalei11 | [Jessica's Intro](Introductions/Jessica.html)
| Edwin Ng | Frontend Dev, Designer | https://github.com/edwinng5 | [Edwin's Intro](Introductions/Edwin.html)