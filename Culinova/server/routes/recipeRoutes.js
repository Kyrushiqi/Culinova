const express = require('express');
const router = express.Router();
const {
    getAllPublicRecipes,
    createRecipe,
    getAllUserRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getRecipeByExactName
} = require('../controllers/recipeControllers');

// IMPORTANT: This public route must be defined before the '/:id' route
// so that Express doesn't mistake "public" for an ID.
router.get('/public', getAllPublicRecipes);

// NEW: search by exact recipe_name
router.get('/by-name', getRecipeByExactName);
// Handles requests to the base '/api/recipes' URL.
// POST creates a new recipe.
// GET fetches all recipes for the logged-in user.
router.route('/')
    .post(createRecipe)
    .get(getAllUserRecipes);

// Handles requests for a specific recipe by its ID (e.g., /api/recipes/12345)
// GET fetches the recipe.
// PUT updates the recipe.
// DELETE removes the recipe.
router.route('/:id')
    .get(getRecipeById)
    .put(updateRecipe)
    .delete(deleteRecipe);

module.exports = router;
