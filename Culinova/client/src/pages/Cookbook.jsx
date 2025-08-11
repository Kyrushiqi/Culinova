import { useContext, useEffect } from 'react';
import { UserContext } from "../../context/userContext";
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

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
    return (
        <div>
          <Navbar />
        </div>
    );
}