import './Home.css';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import RecipeList from '../components/RecipeList';
import recipeService from '../services/recipeService';
import toast from 'react-hot-toast';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Home() {
  const [key, setKey] = useState('with');
  const [withIngredients, setWithIngredients] = useState('');
  const [withoutIngredients, setWithoutIngredients] = useState('');

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
  const navigate = useNavigate();

  /**
   * Handles the form submission to search for recipes using BOTH fields.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(false);
    setRecipes([]);

    // ✅ Trim the values from both text boxes
    const withIngs = withIngredients.trim();
    const withoutIngs = withoutIngredients.trim();

    if (!withIngs && !withoutIngs) {
      toast.error('Please enter ingredients in at least one of the fields.');
      setLoading(false);
      return;
    }

    try {
      // ✅ Call the API with an object containing both ingredient lists
      const data = await recipeService.findRecipesByIngredients({ 
        withIngredients: withIngs, 
        withoutIngredients: withoutIngs 
      });
      
      setRecipes(data);
      if (data.length === 0) {
        toast.success("No recipes found with those criteria.");
      }
    } catch (error) {
      toast.error('Could not find recipes. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleRecipeSelect = (recipeId) => {
    navigate('/cookbook', { state: { openRecipeId: recipeId } });
  };


  return (
    <>
      <Navbar />
      <div className="formatting-3-containers">
        <Filter />

        <div className="main-content-container">
          <Form onSubmit={handleSubmit}>
            <h1 className="header-box">Culinova</h1>
            <div className="main-bg">
                <h5>
                  Dont know what to make with your ingredients? Let us help you! :D
                </h5>

              <div id="with-without-container">
                <Tabs
                  id="controlled-tab"
                  activeKey={key}
                  onSelect={(k) => setKey(k)}
                  className="mb-3 customize-tabs"
                >
                  <Tab eventKey="with" title="With">
                    <div id="list-ingredients-box">
                      <textarea
                        className="form-control"
                        aria-label="With"
                        placeholder="List your ingredients here (one per line or comma-separated)..."
                        id="textarea-ingredients"
                        value={withIngredients}
                        onChange={(e) => setWithIngredients(e.target.value)}
                      ></textarea>
                    </div>
                  </Tab>

                  <Tab eventKey="without" title="Without">
                    <div id="list-ingredients-box">
                      <textarea
                        className="form-control"
                        aria-label="Without"
                        placeholder="List your ingredients here (one per line or comma-separated)..."
                        id="textarea-ingredients"
                        value= {withoutIngredients}
                        onChange= {(e) => setWithoutIngredients(e.target.value)}
                      ></textarea>
                    </div>
                  </Tab>
                </Tabs>
                
                <div className="display-box">
                  <p><strong>With Ingredients:</strong></p>
                  <pre>{withIngredients}</pre>

                  <p><strong>Without Ingredients:</strong></p>
                  <pre>{withoutIngredients}</pre>
                  
                  <Button as="input" type="submit" value="Submit" id="submit-btn" disabled={loading}/>
                </div>
        
              </div>
            </div>
          </Form>

          <div className="card-bg">
            {loading && <p>Searching for recipes...</p>}
            
            {!loading && searched && recipes.length === 0 && (
              <p>No recipes matched your criteria.</p>
            )}

            {recipes.length > 0 && (
              <RecipeList recipes={recipes} onRecipeSelect={handleRecipeSelect} />
            )}
          </div>
        </div>

        <div className="right-container">
          <Button as={Link} to="/cookbook" variant="primary" id="cookbook-btn">Cookbook</Button>

          <h2 className="header-box">Favorites</h2>
          <div id="favorites-container">
            <div id="favorites-bg"></div>
          </div>
        </div>
      </div>
    </>
  );
}