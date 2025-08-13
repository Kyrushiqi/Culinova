import React from 'react';
import RecipeCard from './RecipeCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function RecipeList({ recipes, onRecipeSelect }) {
    if (!recipes || recipes.length === 0) {
        return <p>No recipes found in this section.</p>;
    }

    return (
        <Row xs={1} md={2} lg={4} className="g-4">
            {recipes.map(recipe => (
                <Col key={recipe._id}>
                    <RecipeCard recipe={recipe} onRecipeSelect={onRecipeSelect} />
                </Col>
            ))}
        </Row>
    );
}
