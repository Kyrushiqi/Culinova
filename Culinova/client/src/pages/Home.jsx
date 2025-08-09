import './Home.css';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';

export default function Home() {
  const [key, setKey] = useState('with');

  return (
    <>
      <Navbar />
      <div className="formatting-3-containers">
        <Filter />

        <div className="main-content-container">
          <div className="main-bg">
            <div id="main-header-text">
              <h1 className="header-box">Culinova</h1>
              <h5>
                Don’t know what to make with your ingredients? Let us help you! :D
              </h5>
            </div>

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
                    ></textarea>
                  </div>
                </Tab>
                
              </Tabs>
            </div>
          </div>
        </div>

        <div className="right-container">
          <div id="your-cookbook-btn">
            <Button as={Link} to="/cookbook" variant="primary" id="cookbook-btn">Your Cookbook</Button>
          </div>

          <div id="favorites-container">
            <h2 className="header-box">Favorites</h2>
          </div>
        </div>
      </div>
    </>
  );
}
