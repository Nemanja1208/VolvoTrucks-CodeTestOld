import React from 'react';
import './App.css';
import Vehicles from './components/vehicles/Vehicles';
import Login from './components/login/Login';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';

function App() {

  const userStatus = useSelector(selectUser);

  return (
  <div>
    {userStatus ? <Vehicles /> : <Login />}
  </div>
  );
}

export default App;
