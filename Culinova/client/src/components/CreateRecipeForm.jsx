import { useState } from "react";
import toast from 'react-hot-toast';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import recipeService from '../services/recipeService';
import './UpdateRecipeForm.css'; // Use the same button styles

export default function CreateRecipeForm({ onRecipeCreated, onCancel }) {
    const [formData, setFormData] = useState({
        recipe_name: "",
        description: "",
        ingredients: "",
        directions: "",
        photo_url: "",
        prep_time: "",
        cook_time: "",
        total_time: "",
        nutrition: "",
        dietary_filters: { vegan: false, vegetarian: false, gluten_free: false, dairy_free: false, nut_free: false, halal: false, kosher: false, drinks: false }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name in formData.dietary_filters) {
            setFormData(prev => ({ ...prev, dietary_filters: { ...prev.dietary_filters, [name]: checked } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: type === 'number' ? (value ? Number(value) : '') : value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submissionData = { ...formData, ingredients: formData.ingredients.split(',').map(item => item.trim()) };
        try {
            const newRecipe = await recipeService.createRecipe(submissionData);
            onRecipeCreated(newRecipe);
        } catch (error) {
            toast.error('Failed to create recipe.');
            console.error(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="p-4 bg-light rounded-3">
            <h4 className="mb-4">Add a New Recipe</h4>
            <Row className="mb-3">
                <Form.Group as={Col} sm={8}>
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control type="text" name="recipe_name" value={formData.recipe_name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group as={Col} sm={4}>
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control type="text" name="photo_url" value={formData.photo_url} onChange={handleChange} />
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Ingredients (comma-separated)</Form.Label>
                <Form.Control as="textarea" rows={3} name="ingredients" value={formData.ingredients} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Directions</Form.Label>
                <Form.Control as="textarea" rows={4} name="directions" value={formData.directions} onChange={handleChange} required />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Prep Time (mins)</Form.Label>
                    <Form.Control type="number" name="prep_time" value={formData.prep_time} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Cook Time (mins)</Form.Label>
                    <Form.Control type="number" name="cook_time" value={formData.cook_time} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Total Time (mins)</Form.Label>
                    <Form.Control type="number" name="total_time" value={formData.total_time} onChange={handleChange} />
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Nutrition Facts</Form.Label>
                <Form.Control type="text" name="nutrition" value={formData.nutrition} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-4">
                <Form.Label>Dietary Filters</Form.Label>
                <div className="d-flex flex-wrap">
                    {Object.keys(formData.dietary_filters).map(f => (
                        <Form.Check key={f} type="checkbox" label={f.replace(/_/g, ' ')} name={f} checked={formData.dietary_filters[f]} onChange={handleChange} className="me-3 text-capitalize"/>
                    ))}
                </div>
            </Form.Group>
            <div className="mt-4">
                <Button variant="primary" type="submit" className="me-2 save-btn">Submit Recipe</Button>
                <Button variant="secondary" onClick={onCancel} className="cancel-btn">Cancel</Button>
            </div>
        </Form>
    );
}
