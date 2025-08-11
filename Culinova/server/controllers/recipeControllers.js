import express from 'express';
import Recipe from '../models/recipe.js'

const router = express.Router();

//Create Recipes
//Need to change / to /Cookbook-Creation
router.post('/', async (req, res) => {
    const {title, ingredients, instructions, catergory, photoUrl, cookingTime} = req.body;

    try {
        if (!title || !ingredients || !instructions || !catergory || !photoUrl || !cookingTime){
            return res.json({
                error: 'Please fill in all the fields.'
            });        
        }
        const recipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            category,
            cookingTime,
            photoUrl
        })
    } catch (error) {
        console.log(error)
    }
})