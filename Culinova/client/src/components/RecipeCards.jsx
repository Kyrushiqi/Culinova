import {Row, Col, Card } from 'react-bootstrap';

export default function RecipeCards(){
    return (
        <Row xs={1} md={3} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
                <Col key={idx}>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />

                        <Card.Body>
                        <Card.Title>Recipe Card title</Card.Title>
                        <Card.Text>
                            Stars
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}