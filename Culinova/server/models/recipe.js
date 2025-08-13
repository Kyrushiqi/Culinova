const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // This should match the name you used for your User model
        required: true
    },
    recipe_name: {
        type: String,
        required: [true, 'Recipe name is required']
    },
    ingredients: {
        type: [String],
        required: [true, 'Ingredients are required']
    },
    description: {
        type: String,
    },
    directions: {
        type: String,
        required: [true, 'Directions are required']
    },
    dietary_filters: {
        vegan: { type: Boolean, default: false },
        vegetarian: { type: Boolean, default: false },
        gluten_free: { type: Boolean, default: false },
        dairy_free: { type: Boolean, default: false },
        nut_free: { type: Boolean, default: false },
        halal: { type: Boolean, default: false },
        kosher: { type: Boolean, default: false },
        drinks: { type: Boolean, default: false },
    },
    total_time: {
        type: Number // in minutes
    },
    cook_time: {
        type: Number // in minutes
    },
    prep_time: {
        type: Number // in minutes
    },
    nutrition: {
        type: String
    },
    photo_url: {
        type: String,
        default: 'https://placehold.co/600x400/EEE/31343C?text=No+Image'
    }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const RecipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = RecipeModel;