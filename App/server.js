const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Database setup
const db = new sqlite3.Database('recipes.db');

// Create tables if they don't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        mood TEXT NOT NULL
    )`);

    // Insert some sample recipes if the table is empty
    db.get("SELECT COUNT(*) as count FROM recipes", (err, row) => {
        if (row.count === 0) {
            const sampleRecipes = [
                {
                    name: "Comforting Mac and Cheese",
                    ingredients: "Macaroni, Cheese, Milk, Butter, Flour, Salt, Pepper",
                    instructions: "1. Cook macaroni\n2. Make cheese sauce\n3. Combine and bake",
                    mood: "sad"
                },
                {
                    name: "Energizing Smoothie Bowl",
                    ingredients: "Banana, Berries, Yogurt, Honey, Granola",
                    instructions: "1. Blend fruits\n2. Top with granola\n3. Drizzle honey",
                    mood: "tired"
                },
                {
                    name: "Celebration Cake",
                    ingredients: "Flour, Sugar, Eggs, Butter, Vanilla, Frosting",
                    instructions: "1. Mix ingredients\n2. Bake\n3. Decorate",
                    mood: "happy"
                },
                {
                    name: "Stress-Relief Green Tea",
                    ingredients: "Green tea leaves, Honey, Lemon, Hot water",
                    instructions: "1. Heat water\n2. Steep tea\n3. Add honey and lemon",
                    mood: "stressed"
                },
                {
                    name: "Mood-Boosting Chocolate Brownies",
                    ingredients: "Chocolate, Butter, Sugar, Eggs, Flour, Cocoa powder",
                    instructions: "1. Melt chocolate and butter\n2. Mix ingredients\n3. Bake until set",
                    mood: "sad"
                },
                {
                    name: "Energy-Boosting Oatmeal",
                    ingredients: "Oats, Milk, Banana, Honey, Nuts, Cinnamon",
                    instructions: "1. Cook oats in milk\n2. Top with banana and nuts\n3. Drizzle honey",
                    mood: "tired"
                },
                {
                    name: "Happy Fruit Salad",
                    ingredients: "Mixed fruits, Yogurt, Honey, Mint leaves",
                    instructions: "1. Chop fruits\n2. Mix with yogurt\n3. Garnish with mint",
                    mood: "happy"
                },
                {
                    name: "Calming Chamomile Tea",
                    ingredients: "Chamomile tea, Honey, Lemon, Hot water",
                    instructions: "1. Heat water\n2. Steep tea\n3. Add honey and lemon",
                    mood: "stressed"
                }
            ];

            const stmt = db.prepare("INSERT INTO recipes (name, ingredients, instructions, mood) VALUES (?, ?, ?, ?)");
            sampleRecipes.forEach(recipe => {
                stmt.run(recipe.name, recipe.ingredients, recipe.instructions, recipe.mood);
            });
            stmt.finalize();
        }
    });
});

// Routes
app.get('/api/recipes/:mood', (req, res) => {
    const mood = req.params.mood;
    db.all("SELECT * FROM recipes WHERE mood = ?", [mood], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/recipes', (req, res) => {
    db.all("SELECT * FROM recipes", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 