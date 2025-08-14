import { useState, useEffect } from "react"; // Import useEffect
import toast from 'react-hot-toast';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import recipeService from '../services/recipeService';
import './UpdateRecipeForm.css';

const formatTime = (totalMinutes) => {
    if (!totalMinutes || totalMinutes <= 0) return '0 mins';
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const hoursText = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
    const minutesText = minutes > 0 ? `${minutes} min${minutes > 1 ? 's' : ''}` : '';
    return [hoursText, minutesText].filter(Boolean).join(' ');
};

export default function CreateRecipeForm({ onRecipeCreated, onCancel }) {
    const [formData, setFormData] = useState({
        recipe_name: "", description: "", ingredients: "", directions: "",
        photo_url: "", prep_time: "", cook_time: "", total_time: 0,
        nutrition: "", dietary_filters: { vegan: false, vegetarian: false, gluten_free: false, dairy_free: false, nut_free: false, halal: false, kosher: false, drinks: false }
    });

    useEffect(() => {
        const prep = Number(formData.prep_time) || 0;
        const cook = Number(formData.cook_time) || 0;
        setFormData(prev => ({ ...prev, total_time: prep + cook }));
    }, [formData.prep_time, formData.cook_time]);

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
            {/* ... other form fields (name, photo, description, etc.) ... */}
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
                    <Form.Control type="number" name="prep_time" value={formData.prep_time} onChange={handleChange} min="0" />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Cook Time (mins)</Form.Label>
                    <Form.Control type="number" name="cook_time" value={formData.cook_time} onChange={handleChange} min="0" />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Total Time</Form.Label>
                    {/* Display calculated time instead of an input field */}
                    <p className="form-control-plaintext ps-2">
                        <strong>{formatTime(formData.total_time)}</strong>
                    </p>
                </Form.Group>
            </Row>

            {/* ... other form fields (nutrition, dietary filters) ... */}
            <div className="mt-4">
                <Button variant="primary" type="submit" className="me-2 save-btn">Submit Recipe</Button>
                <Button variant="secondary" onClick={onCancel} className="cancel-btn">Cancel</Button>
            </div>
        </Form>
    );
}