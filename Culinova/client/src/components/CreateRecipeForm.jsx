import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./CreateRecipeForm.css";

export default function RecipeForm() {
  const [formData, setFormData] = useState({
    imageUrl: "",
    recipeName: "",
    description: "",
    cookTime: "",
    servings: "",
    ingredients: "",
    instructions: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Recipe:", formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-sections">
        {/* --- Section 1 --- */}
        <div className="form-section">
          <h4>Add Recipe Details</h4>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control
              type="text"
              name="recipeName"
              placeholder="Enter recipe name"
              value={formData.recipeName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Describe your recipe..."
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cook Time (minutes)</Form.Label>
            <Form.Control
              type="number"
              name="cookTime"
              placeholder="e.g., 45"
              value={formData.cookTime}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Servings</Form.Label>
            <Form.Control
              type="number"
              name="servings"
              placeholder="e.g., 4"
              value={formData.servings}
              onChange={handleChange}
            />
          </Form.Group>
        </div>

        {/* --- Section 2 --- */}
        <div className="form-section">
          <h4>Ingredients & Instructions</h4>
          <Form.Group className="mb-3">
            <Form.Label>Ingredients (separated by commas)</Form.Label>
            <Form.Control
              as="textarea"
              name="ingredients"
              placeholder="Flour, Sugar, Eggs..."
              value={formData.ingredients}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Instructions</Form.Label>
            <Form.Control
              as="textarea"
              name="instructions"
              placeholder="Step 1..., Step 2..."
              value={formData.instructions}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Recipe
        </Button>
        </div>
      </div>

      
    </Form>
  );
}
