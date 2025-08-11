import mongoose from "mongoose";
import { insertMany } from "./user";

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        requred: true,
    },
    ingredients: [
        {
            type: String,
            requred: true
        }
    ],
    instructions: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Recipe = mongoose.model("Recipe", recipeSchema)

export default Recipe;