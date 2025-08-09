// client/src/pages/RecipeDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`/api/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      <h2>{recipe.recipe_name}</h2>
      <img src={recipe.img_src} alt={recipe.recipe_name} />
      <p><strong>Rating:</strong> {recipe.rating}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Directions:</strong> {recipe.directions}</p>
      <p><strong>Nutrition:</strong> {recipe.nutrition}</p>
      <p><strong>Dietary Needs:</strong> {recipe.dietary_needs}</p>
      <a href={recipe.url} target="_blank" rel="noreferrer">Original Recipe</a>
    </div>
  );
}
