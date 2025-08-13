import './Home.css';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
//import RecipeCards from '../components/RecipeCards';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';

export default function Home() {
  const [key, setKey] = useState('with');
  const [withIngredients, setWithIngredients] = useState('');
  const [withoutIngredients, setWithoutIngredients] = useState('');

  return (
    <>
      <Navbar />
      <div className="formatting-3-containers">
        <Filter />

        <div className="main-content-container">
          <h1 className="header-box">Culinova</h1>
          <div className="main-bg">
              <h5>
                Don’t know what to make with your ingredients? Let us help you! :D
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
                      placeholder="List your ingredients here (comma-separated)..."
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
                      placeholder="List your ingredients here (comma-separated)..."
                      id="textarea-ingredients"
                      value= {withoutIngredients}
                      onChange= {(e) => setWithoutIngredients(e.target.value)}
                    ></textarea>
                  </div>
                </Tab>
              </Tabs>

              
              {/* <h2 className="header-box">Ingredients</h2> */}

              <div className="display-box">
                <p><strong>With Ingredients:</strong></p>
                <pre>{withIngredients}</pre>

                <p><strong>Without Ingredients:</strong></p>
                <pre>{withoutIngredients}</pre>
                
                <Button as="input" type="submit" value="Submit" id="submit-btn"/>
              </div>
      
            </div>
          </div>

          <div className="card-bg">
            {/*<RecipeCards />*/}
          </div>
        </div>

        <div className="right-container">
          <Button as={Link} to="/cookbook" variant="primary" id="cookbook-btn">Your Cookbook</Button>

          <h2 className="header-box">Favorites</h2>
          <div id="favorites-container">
            <div id="favorites-bg"></div>
          </div>
        </div>
      </div>
    </>
  );
}
