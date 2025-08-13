import React from 'react';
import Card from 'react-bootstrap/Card';
import './RecipeCard.css';

export default function RecipeCard({ recipe, onRecipeSelect }) {
    // This check prevents the app from crashing if the recipe prop is somehow missing
    if (!recipe) {
        return null; 
    }

    return (
        <Card 
            className="h-100 shadow-sm recipe-card" 
            onClick={() => onRecipeSelect(recipe._id)}
        >
            <Card.Img 
                variant="top" 
                src={recipe.photo_url} 
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/EEE/31343C?text=No+Image' }} 
                className="recipe-card-img"
            />
            <Card.Body className="d-flex align-items-center justify-content-center">
                <Card.Title className="text-center m-0">{recipe.recipe_name}</Card.Title>
            </Card.Body>
        </Card>
    );
}