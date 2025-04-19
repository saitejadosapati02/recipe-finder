let currentMood = '';
let currentRecipe = null;

async function getRecipe(mood) {
    console.log('Getting recipe for mood:', mood);
    currentMood = mood;
    try {
        const response = await fetch(`/api/recipes/${mood}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const recipes = await response.json();
        console.log('Received recipes:', recipes);
        
        if (recipes && recipes.length > 0) {
            // Randomly select a recipe
            const randomIndex = Math.floor(Math.random() * recipes.length);
            currentRecipe = recipes[randomIndex];
            console.log('Selected recipe:', currentRecipe);
            
            // Display the recipe
            updateRecipeDisplay(currentRecipe);
        } else {
            alert('No recipes found for this mood. Please try another mood.');
        }
    } catch (error) {
        console.error('Error fetching recipe:', error);
        alert('Error fetching recipe. Please try again.');
    }
}

async function getNewRecipe() {
    console.log('Current mood:', currentMood);
    if (!currentMood) {
        alert('Please select a mood first.');
        return;
    }

    try {
        const response = await fetch(`/api/recipes/${currentMood}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const recipes = await response.json();
        console.log('All recipes for mood:', recipes);
        
        if (recipes && recipes.length > 0) {
            // If we only have one recipe, just use it
            if (recipes.length === 1) {
                currentRecipe = recipes[0];
            } else {
                // Get all recipes except the current one
                const otherRecipes = recipes.filter(recipe => recipe.name !== currentRecipe.name);
                console.log('Available other recipes:', otherRecipes);
                
                if (otherRecipes.length > 0) {
                    // Randomly select from other recipes
                    const randomIndex = Math.floor(Math.random() * otherRecipes.length);
                    currentRecipe = otherRecipes[randomIndex];
                } else {
                    // If somehow we filtered out all recipes, get a random one
                    const randomIndex = Math.floor(Math.random() * recipes.length);
                    currentRecipe = recipes[randomIndex];
                }
            }
            
            console.log('Selected new recipe:', currentRecipe);
            updateRecipeDisplay(currentRecipe, true);
        } else {
            alert('No more recipes available for this mood.');
        }
    } catch (error) {
        console.error('Error fetching new recipe:', error);
        alert('Error fetching new recipe. Please try again.');
    }
}

function updateRecipeDisplay(recipe, isNewRecipe = false) {
    console.log('Updating display with recipe:', recipe);
    
    // Get DOM elements
    const recipeContainer = document.getElementById('recipe-container');
    const recipeName = document.getElementById('recipe-name');
    const recipeIngredients = document.getElementById('recipe-ingredients');
    const recipeInstructions = document.getElementById('recipe-instructions');
    
    // Verify elements exist
    if (!recipeContainer || !recipeName || !recipeIngredients || !recipeInstructions) {
        console.error('Required DOM elements not found');
        return;
    }
    
    // Update content
    recipeName.innerHTML = recipe.name;
    recipeIngredients.innerHTML = recipe.ingredients;
    recipeInstructions.innerHTML = recipe.instructions;
    
    // Show container if hidden
    if (recipeContainer.classList.contains('hidden')) {
        recipeContainer.classList.remove('hidden');
    }
    
    // Handle animation
    if (isNewRecipe) {
        recipeContainer.classList.remove('animate__fadeIn');
        // Force a reflow
        void recipeContainer.offsetWidth;
    }
    
    // Add animation classes
    recipeContainer.classList.add('animate__animated', 'animate__fadeIn');
    
    // Log the updated content
    console.log('Updated recipe name:', recipeName.textContent);
    console.log('Updated recipe ingredients:', recipeIngredients.textContent);
    console.log('Updated recipe instructions:', recipeInstructions.textContent);
} 