# Annamaitri
Project built during a college hackathon focused on Sustainable Development Goals (SDGs). Developed using React, Node.js, Express, MongoDB, and Google Maps API.

# 🌾 Anna Maitri – Food Donation App

A project developed during **CodeYatra Hackathon** to promote **Sustainable Development** by reducing food waste and helping those in need.  
**Anna Maitri** bridges the gap between food donors and recipients through a simple, secure, and location-aware platform.

---

##  Features

-  **User Authentication** – Secure Sign In & Log In for verified donors.
-  **Food Donation System** – Add and manage surplus food contributions.
-  **Interactive Dashboard** – Track your donation history and status.
-  **Location-Based Matching** – Connects donors with nearby recipients for quick distribution.
-  **Real-Time Updates** – Get notified about donation status and pickup.

---

## Tech Stack

| Layer      | Technologies                        |
|------------|-------------------------------------|
| Frontend   | React.js                            |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB                             |
| Auth       | JWT (JSON Web Tokens)               |
| Others     | Google Maps API (for location match)|

---

##  Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone git@github.com:poudelalina86/Annamaitri.git
   cd Annamaitri
  or using HTTPS 
  ```bash
  git clone https://github.com/poudelalina86/Annamaitri.git
  cd Annamaitri

 ```
2.Navigate to Backend folder and  install dependencies:
   
```bash
   cd Hack_Back
   npm install
```
3. Create a .env file in the Hack_Back directory and set up environment variables in a .env file:
 ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
```
4. Start the backend server:
   
```bash
   npm run dev
```
5. Navigate to the frontend directory and install the frontend dependencies
   
```bash
   cd Hack_Front
   npm install

```
6. Start the react development server
   ```bash
   npm run dev
