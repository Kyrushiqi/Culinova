import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import UpdateRecipeForm from './UpdateRecipeForm';

import './recipeDetail.css';

export default function RecipeDetail({ recipe, onBack, onRecipeDeleted, onRecipeUpdated }) {
  const { user } = useContext(UserContext);

  // NEW: allow this component to work at /recipes/:id by fetching if needed
  const { id } = useParams();
  const navigate = useNavigate();
  const [fetchedRecipe, setFetchedRecipe] = useState(null);
  const [loading, setLoading] = useState(Boolean(id) && !recipe);

  const load = useCallback(() => {
    // Only fetch if we don't have a recipe prop and we do have an :id in the URL
    if (!id || recipe) return;
    setLoading(true);
    axios.get(`/api/recipes/${id}`)
      .then(({ data }) => setFetchedRecipe(data))
      .catch(() => navigate('/'))          // go somewhere safe if not found
      .finally(() => setLoading(false));
  }, [id, recipe, navigate]);

  useEffect(() => {
    load();
  }, [load]);

  // Use whichever recipe we have: the prop (from parent) or the one we fetched
  const rec = recipe || fetchedRecipe;

  const [isEditing, setIsEditing] = useState(false);

  // Owner check (works whether rec.user is populated or just an id)
  const ownerId = rec?.user?._id || rec?.user;
  const currentId = user?._id || user?.id;
  const isOwner = ownerId && currentId && String(ownerId) === String(currentId);

  // --- YOUR ORIGINAL delete handler (unchanged) ---
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${recipe.recipe_name}"?`)) {
      onRecipeDeleted(recipe._id);
    }
  };

  const handleUpdateSuccess = (updatedRecipe) => {
    onRecipeUpdated(updatedRecipe);
    setIsEditing(false);
  };

  if (!rec || loading) {
    return <div className="p-md-4 p-2">Loading…</div>;
  }

  // If the user clicks "Edit", render the update form instead of the details
  if (isEditing) {
    return (
        <div className="p-md-4 p-2">
            <Button variant="outline-secondary" onClick={onBack} className="mb-4 back-btn">
                &larr; Back
            </Button>
            
            {/* Only show Edit/Delete buttons if the logged-in user is the owner */}
            {isOwner && (
                <div className="float-end">
                    <Button variant="secondary" className="me-2 edit-btn" onClick={() => setIsEditing(true)}>Edit</Button>
                    <Button variant="danger" onClick={handleDelete} className="delete-btn">Delete</Button>
                </div>
            )}

            <img src={recipe.photo_url} className="img-fluid rounded mb-4 w-100 recipe-img" alt={recipe.recipe_name}/>

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

  return (
    <div className="p-md-4 p-2">
      <Button
        variant="outline-secondary"
        onClick={onBack ? onBack : () => navigate(-1)}
        className="mb-4"
      >
        &larr; Back to Cookbook
      </Button>

      {/* Only show Edit/Delete when:
          - the current user owns the recipe, AND
          - we actually received the recipe via props (so your existing delete flow stays intact) */}
      {isOwner && recipe && (
        <div className="float-end">
          <Button variant="secondary" className="me-2" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}

      <img
        src={rec.photo_url}
        className="img-fluid rounded mb-4 w-100"
        alt={rec.recipe_name}
        style={{ maxHeight: '450px', objectFit: 'cover' }}
      />

      <p className="lead">{rec.description}</p>

      <div className="d-flex flex-wrap justify-content-around text-center my-4">
        {rec.prep_time && <div className="p-2"><b>Prep:</b> {rec.prep_time} mins</div>}
        {rec.cook_time && <div className="p-2"><b>Cook:</b> {rec.cook_time} mins</div>}
        {rec.total_time && <div className="p-2"><b>Total:</b> {rec.total_time} mins</div>}
        {rec.user?.name && <div className="p-2"><b>By:</b> {rec.user.name}</div>}
      </div>

      <div className="mb-4">
        {rec.dietary_filters &&
          Object.entries(rec.dietary_filters)
            .filter(([, value]) => value)
            .map(([key]) => (
              <Badge pill bg="success" className="me-2 fs-6" key={key}>
                {key.replace(/_/g, ' ')}
              </Badge>
            ))}
      </div>

      <div className="row">
        <div className="col-md-5 mb-4">
          <h4>Ingredients</h4>
          <ListGroup variant="flush">
            {(rec.ingredients || []).map((item, index) => (
              <ListGroup.Item key={index}>{item}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="col-md-7">
          <h4>Directions</h4>
          <p style={{ whiteSpace: 'pre-wrap' }}>{rec.directions}</p>
        </div>
      </div>

      {rec.nutrition && (
        <div className="mt-4">
          <h4>Nutrition</h4>
          <p>{rec.nutrition}</p>
        </div>
      )}
    </div>
  );
}
