import React, { useState } from 'react';

import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import './Login.css'

function Login() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login">
            <form className="loginForm">
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
