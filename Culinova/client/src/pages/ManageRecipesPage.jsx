import React from 'react';
import Navbar from '../components/Navbar';
import RecipeManager from '../components/RecipeManager'; // The component with all the logic
import './ManageRecipesPage.css'; // We'll create this for styling

export default function ManageRecipesPage() {
    return (
        <div>
            <Navbar />
            <div className="manager-container">
                <h1 className="manager-title">Recipe Management</h1>
                <div className="manager-content-box">
                    {/* The RecipeManager component handles everything else */}
                    <RecipeManager />
                </div>
            </div>
        </div>
    );
}
