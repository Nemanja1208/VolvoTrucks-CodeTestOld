import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';

import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import './Login.css'

function Login() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(username === "Fleet Owner"){
        dispatch(login({
            username: username,
            email: email,
            password: password,
            loggedIn: true,
            }))
        }
    }

    return (
        <div className="login">
            <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
                <h1><LocalShippingIcon /> My Fleet - Login </h1>
                <input type="usernamename" placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="submitButton"> LOG IN </button>
            </form>
        </div>
    )
}

export default Login
