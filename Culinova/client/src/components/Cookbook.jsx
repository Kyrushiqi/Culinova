import { useContext, useEffect } from 'react';
import { UserContext } from "../../context/userContext";
import toast from 'react-hot-toast';

import Navbar from './Navbar';
import './Cookbook.css';

import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function Cookbook() {
    /*
    const { user } = useContext(UserContext);

    useEffect(() => {
        // Shows that the user is in the cookbook in the console
        console.log('User object in Cookbook:', user);

        if (user && user.name) {
            toast.success(`Welcome to your cookbook ${user.name}!`);
        }
    }, [user]);
    */

    const [key, setKey] = useState('all');

    return (
        <div>
            <Navbar />
            
            <div className="cookbook-container"> 
                <h2 id="cookbook-title">Your Cookbook</h2>
                <div className="cookbook-tabs">
                    <Tabs
                    id="controlled-tab"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3 customize-tabs"
                    >
                    <Tab eventKey="all" title="All"></Tab>
                    <Tab eventKey="favs" title="Favs"></Tab>
                    <Tab eventKey="recent" title="Recent"></Tab>
                    </Tabs>
                </div>
                <div className="cookbook-yellow-bg">
                    <div className="cookbook-white-bg">
                        <div class="vertical-line"></div>
                        {/* content */}
                    </div>
                </div>
            </div>
        </div>

    );
}