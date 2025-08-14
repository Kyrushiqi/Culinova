import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from "../../context/userContext";
import toast from 'react-hot-toast';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';

import recipeService from '../services/recipeService';
import Navbar from './Navbar';
import CreateRecipeForm from './CreateRecipeForm';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import './Cookbook.css';

export default function Cookbook() {
    const { user } = useContext(UserContext);
    const location = useLocation();

    const [myRecipes, setMyRecipes] = useState([]);
    const [publicRecipes, setPublicRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('community');
    const [isCreating, setIsCreating] = useState(false);

    // Load recipes
    useEffect(() => {
        const loadRecipes = async () => {
            setLoading(true);
            try {
                const publicData = await recipeService.getPublicRecipes();
                setPublicRecipes(publicData);
                if (user) {
                    const userData = await recipeService.getUserRecipes();
                    setMyRecipes(userData);
                }
            } catch (error) {
                toast.error("Could not load recipes.");
            } finally {
                setLoading(false);
            }
        };
        loadRecipes();
    }, [user]);

    useEffect(() => {
    const id = location.state?.openRecipeId; // ← must match the key in navigate()
    if (id) {
        handleRecipeSelect(id);
        window.history.replaceState({}, '', '/cookbook'); // optional: clear state
    }
    }, [location.state]);

    const handleRecipeSelect = async (recipeId) => {
        try {
            const data = await recipeService.getRecipeById(recipeId);
            setSelectedRecipe(data);
        } catch (error) {
            toast.error("Could not fetch recipe details.");
        }
    };

    const handleRecipeCreated = (newRecipe) => {
        setMyRecipes(prev => [newRecipe, ...prev]);
        setPublicRecipes(prev => [newRecipe, ...prev]);
        setIsCreating(false);
        toast.success("Recipe added!");
    };

    const handleRecipeDeleted = async (deletedRecipeId) => {
        try {
            await recipeService.deleteRecipe(deletedRecipeId);
            const filterOut = (recipes) => recipes.filter(r => r._id !== deletedRecipeId);
            setMyRecipes(filterOut);
            setPublicRecipes(filterOut);
            setSelectedRecipe(null);
            toast.success("Recipe deleted!");
        } catch (error) {
            toast.error("Could not delete recipe.");
        }
    };

    const handleRecipeUpdated = (updatedRecipe) => {
        const updateList = (recipes) => recipes.map(r => r._id === updatedRecipe._id ? updatedRecipe : r);
        setMyRecipes(updateList);
        setPublicRecipes(updateList);
        setSelectedRecipe(updatedRecipe);
    };

    const renderContent = () => {
        if (selectedRecipe) {
            return <RecipeDetail 
                recipe={selectedRecipe} 
                onBack={() => setSelectedRecipe(null)}
                onRecipeDeleted={handleRecipeDeleted}
                onRecipeUpdated={handleRecipeUpdated}
            />;
        }
        switch (activeTab) {
            case 'my-recipes':
                return isCreating ? (
                    <CreateRecipeForm onRecipeCreated={handleRecipeCreated} 
                    onCancel={() => setIsCreating(false)} 
                    />
                ) : (
                    <>
                        <div className="text-end mb-3">
                            <Button onClick={() => setIsCreating(true)} className="add-recipe-btn">Add New Recipe</Button>
                        </div>
                        <RecipeList recipes={myRecipes} onRecipeSelect={handleRecipeSelect} />
                    </>
                );
            case 'favs':
                return <p>Upcoming favorite recipe feature...</p>;
            case 'community':
            default:
                return loading ? <p>Loading...</p> : <RecipeList recipes={publicRecipes} onRecipeSelect={handleRecipeSelect} />;
        }
    };

    return (
        <div>
            <Navbar />
            <div className="cookbook-container"> 
                <div className="cookbook-header">
                    <h2 id="cookbook-title">{selectedRecipe ? selectedRecipe.recipe_name : "Cookbook"}</h2>
                    {!selectedRecipe && (
                        <div className="cookbook-tabs">
                            <Tabs 
                                activeKey={activeTab} 
                                onSelect={(k) => {
                                    setIsCreating(false);
                                    setActiveTab(k);
                                }} 
                                className="mb-0 customize-tabs"
                            >
                                <Tab eventKey="community" title="Community Recipes" />
                                {user && <Tab eventKey="my-recipes" title="My Recipes" />}
                                {user && <Tab eventKey="favs" title="Favorites" />}
                            </Tabs>
                        </div>
                    )}
                </div>

                <div className="cookbook-yellow-bg">
                    <div className="cookbook-white-bg">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
