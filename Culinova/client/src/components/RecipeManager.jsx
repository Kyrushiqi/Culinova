import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../context/userContext";
import toast from 'react-hot-toast';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// Import the service that handles API calls
import recipeService from '../services/recipeService';

import CreateRecipeForm from './CreateRecipeForm';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';

export default function RecipeManager() {
    const { user } = useContext(UserContext);
    const [myRecipes, setMyRecipes] = useState([]);
    const [publicRecipes, setPublicRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('community');

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
    
    // READ (Single): Fetches one recipe to show its details
    const handleRecipeSelect = async (recipeId) => {
        try {
            const data = await recipeService.getRecipeById(recipeId);
            setSelectedRecipe(data);
        } catch (error) {
            toast.error("Could not fetch recipe details.");
        }
    };

    // CREATE: Adds a new recipe to the state after it's created
    const handleRecipeCreated = (newRecipe) => {
        setMyRecipes(prev => [newRecipe, ...prev]);
        setPublicRecipes(prev => [newRecipe, ...prev]);
        setActiveTab('my-recipes');
        toast.success("Recipe added!");
    };

    // DELETE: Removes a recipe from the state after it's deleted
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
    
    // UPDATE: Updates a recipe in the state after it's edited
    const handleRecipeUpdated = (updatedRecipe) => {
        const updateList = (recipes) => recipes.map(r => r._id === updatedRecipe._id ? updatedRecipe : r);
        setMyRecipes(updateList);
        setPublicRecipes(updateList);
        setSelectedRecipe(updatedRecipe);
    };

    // If a recipe is selected, show the detail view
    if (selectedRecipe) {
        return <RecipeDetail 
            recipe={selectedRecipe} 
            onBack={() => setSelectedRecipe(null)}
            onRecipeDeleted={handleRecipeDeleted}
            onRecipeUpdated={handleRecipeUpdated}
        />;
    }

    // Otherwise, show the tabs with the recipe lists and create form
    return (
        <>
            <div className="cookbook-tabs">
                <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3 customize-tabs">
                    <Tab eventKey="community" title="Community Recipes" />
                    {user && <Tab eventKey="my-recipes" title="My Recipes" />}
                    {user && <Tab eventKey="add" title="Add New Recipe" />}
                </Tabs>
            </div>
            <Tab.Container activeKey={activeTab}>
                <Tab.Content>
                    <Tab.Pane eventKey="community">
                        {loading ? <p>Loading...</p> : <RecipeList recipes={publicRecipes} onRecipeSelect={handleRecipeSelect} />}
                    </Tab.Pane>
                    <Tab.Pane eventKey="my-recipes">
                        <RecipeList recipes={myRecipes} onRecipeSelect={handleRecipeSelect} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="add">
                        <CreateRecipeForm onRecipeCreated={handleRecipeCreated} />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </>
    );
}