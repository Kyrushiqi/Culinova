import axios from 'axios';

// The base URL for your API. This assumes your backend is running on port 8000.
const API_URL = '/api/recipes';

/**
 * Fetches all public recipes.
 * @returns {Promise<Array>} A promise that resolves to an array of public recipes.
 */
const getPublicRecipes = async () => {
  const response = await axios.get(`${API_URL}/public`);
  return response.data;
};

/**
 * Fetches all recipes for the currently logged-in user.
 * @returns {Promise<Array>} A promise that resolves to an array of the user's recipes.
 */
const getUserRecipes = async () => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

/**
 * Fetches a single recipe by its ID.
 * @param {string} recipeId - The ID of the recipe to fetch.
 * @returns {Promise<Object>} A promise that resolves to the recipe object.
 */
const getRecipeById = async (recipeId) => {
  const response = await axios.get(`${API_URL}/${recipeId}`);
  return response.data;
};

/**
 * Creates a new recipe.
 * @param {Object} recipeData - The data for the new recipe.
 * @returns {Promise<Object>} A promise that resolves to the newly created recipe object.
 */
const createRecipe = async (recipeData) => {
  const response = await axios.post(API_URL, recipeData, { withCredentials: true });
  return response.data;
};

/**
 * Updates an existing recipe.
 * @param {string} recipeId - The ID of the recipe to update.
 * @param {Object} recipeData - The new data for the recipe.
 * @returns {Promise<Object>} A promise that resolves to the updated recipe object.
 */
const updateRecipe = async (recipeId, recipeData) => {
  const response = await axios.put(`${API_URL}/${recipeId}`, recipeData, { withCredentials: true });
  return response.data;
};

/**
 * Deletes a recipe.
 * @param {string} recipeId - The ID of the recipe to delete.
 * @returns {Promise<Object>} A promise that resolves to the success message.
 */
const deleteRecipe = async (recipeId) => {
  const response = await axios.delete(`${API_URL}/${recipeId}`, { withCredentials: true });
  return response.data;
};

/**
 * Finds recipes that include and/or exclude specific ingredients.
 * @param {object} params - An object containing withIngredients and/or withoutIngredients.
 * @param {string} [params.withIngredients] - A comma-separated string of ingredients to include.
 * @param {string} [params.withoutIngredients] - A comma-separated string of ingredients to exclude.
 * @returns {Promise<Array>} A promise that resolves to an array of matching recipes.
 */
const findRecipesByIngredients = async ({ withIngredients, withoutIngredients }) => {
    const params = new URLSearchParams();

    if (withIngredients) {
        params.append('with', withIngredients);
    }
    if (withoutIngredients) {
        params.append('without', withoutIngredients);
    }

    const response = await axios.get(`/api/recipes/filter?${params.toString()}`);
    return response.data;
};


// Bundle all functions into a single object for export
const recipeService = {
  getPublicRecipes,
  getUserRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  findRecipesByIngredients,
};

export default recipeService;