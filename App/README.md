# Mood Recipe Finder

A simple web application that suggests recipes based on your current mood.

## Features

- Select your current mood from a variety of options
- Get a random recipe suggestion based on your mood
- View recipe details including ingredients and instructions
- Request a new recipe suggestion if you don't like the current one

## Setup

1. Make sure you have Node.js installed on your system
2. Clone this repository
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the server:
   ```bash
   node server.js
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

## Technologies Used

- Express.js (Backend)
- SQLite (Database)
- HTML/CSS/JavaScript (Frontend)
- Tailwind CSS (Styling)

## Project Structure

- `server.js` - Express server and database setup
- `public/` - Frontend files
  - `index.html` - Main application page
  - `script.js` - Frontend JavaScript
  - `styles.css` - Additional styles
- `recipes.db` - SQLite database file (created automatically) 