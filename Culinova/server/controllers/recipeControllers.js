const Recipe = require('../models/recipe');
const jwt = require('jsonwebtoken');

/**
 * Converts a plural word to its singular form for common cases.
 * @param {string} word - The word to singularize.
 * @returns {string} The singular form of the word.
 */
const getSingular = (word) => {
  const lowerWord = word.toLowerCase();
  // If the word ends in 'ies', change it to 'y' (e.g., blueberries -> blueberry)
  if (lowerWord.endsWith('ies')) {
    return word.slice(0, -3) + 'y';
  }
  // If the word ends in 's' (but not 'ss'), remove the 's'
  if (lowerWord.endsWith('s') && !lowerWord.endsWith('ss')) {
    return word.slice(0, -1);
  }
  // Otherwise, return the original word
  return word;
};

// @desc    Get all public recipes
const getAllPublicRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({}).sort({ createdAt: -1 }).populate('user', 'name');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching public recipes' });
    }
};

// @desc    Create a new recipe
const createRecipe = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ error: 'Authentication required' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        let recipe = await Recipe.create({ ...req.body, user: decoded.id });
        recipe = await recipe.populate('user', 'name');
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ error: 'Server error while creating recipe' });
    }
};

// @desc    Get all recipes for the logged-in user
const getAllUserRecipes = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ error: 'Authentication required' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const recipes = await Recipe.find({ user: decoded.id }).sort({ createdAt: -1 }).populate('user', 'name');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching recipes' });
    }
};

// @desc    Get a single recipe by ID
const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).populate('user', 'name');
        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: 'Server error while fetching recipe' });
    }
};

// @desc    Update a recipe
const updateRecipe = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ error: 'Authentication required' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
        if (recipe.user.toString() !== decoded.id) return res.status(403).json({ error: 'User not authorized' });

        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('user', 'name');
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ error: 'Server error while updating recipe' });
    }
};

// @desc    Delete a recipe
const deleteRecipe = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ error: 'Authentication required' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
        if (recipe.user.toString() !== decoded.id) return res.status(403).json({ error: 'User not authorized' });

        await recipe.deleteOne();
        res.status(200).json({ message: 'Recipe removed' });
    } catch (error) {
        res.status(500).json({ error: 'Server error while deleting recipe' });
    }
};

// @desc    Get a single recipe by its exact name
const getRecipeByExactName = async (req, res) => {
  try {
    const name = (req.query.name || '').trim();
    if (!name) return res.status(400).json({ error: 'name is required' });

    const recipe = await Recipe.findOne({ recipe_name: name })
      .collation({ locale: 'en', strength: 2 })
      .populate('user', 'name')
      .lean();

    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    return res.status(200).json(recipe);
  } catch (error) {
    console.error('getRecipeByExactName error:', error);
    res.status(500).json({ error: 'Server error while finding recipe by name' });
  }
};

// @desc    Get recipes filtered by ingredients
const getRecipesByIngredients = async (req, res) => {
    try {
        const { with: withIngredients, without: withoutIngredients } = req.query;
        
        const queryConditions = [];

        if (withIngredients) {
            const ingredientsArray = withIngredients.split(',').map(item => item.trim()).filter(item => item);
            if (ingredientsArray.length > 0) {
              queryConditions.push({ ingredients: { '$all': ingredientsArray.map(ing => new RegExp(getSingular(ing), 'i')) } });
            }
        }

        if (withoutIngredients) {
            const ingredientsArray = withoutIngredients.split(',').map(item => item.trim()).filter(item => item);
            if (ingredientsArray.length > 0) {
              queryConditions.push({ ingredients: { '$nin': ingredientsArray.map(ing => new RegExp(getSingular(ing), 'i')) } });
            }
        }
        
        const query = queryConditions.length > 0 ? { '$and': queryConditions } : {};

        const recipes = await Recipe.find(query).sort({ createdAt: -1 }).populate('user', 'name');
        
        res.status(200).json(recipes);

    } catch (error) {
        console.error('getRecipesByIngredients error:', error);
        res.status(500).json({ error: 'Server error while filtering recipes' });
    }
};

module.exports = {
    getAllPublicRecipes,
    createRecipe,
    getAllUserRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe, 
    getRecipeByExactName,
    getRecipesByIngredients
};