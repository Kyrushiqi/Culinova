import { useContext } from 'react'; 
import { UserContext } from "../../context/userContext";
import React from 'react';

export default function Cookbook() {
    const { user } = useContext(UserContext); 
  return (
    <div>
      {!!user && (<h1>{user.name}'s Cookbook</h1>)}
    </div>
  )
}