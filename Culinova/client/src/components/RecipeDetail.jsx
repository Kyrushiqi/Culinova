import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import UpdateRecipeForm from './UpdateRecipeForm';

export default function RecipeDetail({ recipe, onBack, onRecipeDeleted, onRecipeUpdated }) {
    const { user } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const isOwner = user && recipe.user && user.id === recipe.user._id;

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${recipe.recipe_name}"?`)) {
            onRecipeDeleted(recipe._id);
        }
    };
    
    const handleUpdateSuccess = (updatedRecipe) => {
        onRecipeUpdated(updatedRecipe);
        setIsEditing(false);
    };

    // If the user clicks "Edit", render the update form instead of the details
    if (isEditing) {
        return <UpdateRecipeForm recipe={recipe} onUpdateSuccess={handleUpdateSuccess} onCancel={() => setIsEditing(false)} />;
    }

    // Otherwise, render the recipe details
    return (
        <div className="p-md-4 p-2">
            <Button variant="outline-secondary" onClick={onBack} className="mb-4">
                &larr; Back to Cookbook
            </Button>
            
            {/* Only show Edit/Delete buttons if the logged-in user is the owner */}
            {isOwner && (
                <div className="float-end">
                    <Button variant="secondary" className="me-2" onClick={() => setIsEditing(true)}>Edit</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </div>
            )}

            <img src={recipe.photo_url} className="img-fluid rounded mb-4 w-100" alt={recipe.recipe_name} style={{maxHeight: "450px", objectFit: "cover"}}/>

            <p className="lead">{recipe.description}</p>
            
            <div className="d-flex flex-wrap justify-content-around text-center my-4">
                {recipe.prep_time && <div className="p-2"><b>Prep:</b> {recipe.prep_time} mins</div>}
                {recipe.cook_time && <div className="p-2"><b>Cook:</b> {recipe.cook_time} mins</div>}
                {recipe.total_time && <div className="p-2"><b>Total:</b> {recipe.total_time} mins</div>}
                {recipe.user && <div className="p-2"><b>By:</b> {recipe.user.name}</div>}
            </div>

            <div className="mb-4">
                {Object.entries(recipe.dietary_filters).filter(([, value]) => value).map(([key]) => (
                    <Badge pill bg="success" className="me-2 fs-6" key={key}>{key.replace(/_/g, ' ')}</Badge>
                ))}
            </div>

            <div className="row">
                <div className="col-md-5 mb-4">
                    <h4>Ingredients</h4>
                    <ListGroup variant="flush">
                        {recipe.ingredients.map((item, index) => <ListGroup.Item key={index}>{item}</ListGroup.Item>)}
                    </ListGroup>
                </div>
                <div className="col-md-7">
                    <h4>Directions</h4>
                    <p style={{whiteSpace: "pre-wrap"}}>{recipe.directions}</p>
                </div>
            </div>
            
            {recipe.nutrition && <div className="mt-4"><h4>Nutrition</h4><p>{recipe.nutrition}</p></div>}
        </div>
    );
}