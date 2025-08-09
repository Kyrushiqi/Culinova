import {Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RecipeCards(){
    const [recipes, setRecipes] = useState([]); // [] will read from an array
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/recipes')
            .then(res => setRecipes(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleCardClick = (recipeId) => {
        navigate('recipes/${recipeId}'); // route to detailed recipes
    };

    return (
        <Row xs={1} md={3} className="g-4">
            {recipes.map(recipe => (
                <Col key={recipe._id}>
                <Card onClick={() => handleCardClick(recipe._id)} style={{ cursor: 'pointer' }}>
                    <Card.Img variant="top" src={recipe.img_src} />

                    <Card.Body>
                    <Card.Title>{recipe.recipe_name}</Card.Title>
                    <Card.Text>⭐ {recipe.rating}</Card.Text>
                    </Card.Body>
                    
                </Card>
                </Col>
            ))}
            </Row>


        // <Row xs={1} md={3} className="g-4">
        //     {Array.from({ length: 4 }).map((_, idx) => (
        //         <Col key={idx}>
        //             <Card>
        //                 <Card.Img variant="top" src="holder.js/100px160" />

        //                 <Card.Body>
        //                 <Card.Title>Recipe Card title</Card.Title>
        //                 <Card.Text>
        //                     Stars
        //                 </Card.Text>
        //                 </Card.Body>
        //             </Card>
        //         </Col>
        //     ))}
        // </Row>
    );
}