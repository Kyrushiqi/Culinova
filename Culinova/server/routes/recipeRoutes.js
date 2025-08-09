import express from 'express';
import Recipe from '../models/Recipe.js'; // Mongoose model

const router = express.Router();

router.get('/recipes', async(req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

export default router;