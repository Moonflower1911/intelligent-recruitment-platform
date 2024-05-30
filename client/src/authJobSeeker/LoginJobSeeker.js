import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LoginJobSeeker() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/authjobseeker/login', { username, password });
            alert('Login successful');
            console.log(response.data.token);
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div>
            
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/authjobseeker">Register here</Link>
            </p>
        </div>
    );
}

export default LoginJobSeeker;