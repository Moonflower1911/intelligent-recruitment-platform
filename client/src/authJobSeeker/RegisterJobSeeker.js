import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegisterJobSeeker() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3001/authjobseeker', { username, password });
            alert('Registration successful');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
       <div> 
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/authjobseeker/login">login here</Link>
            </p>
            
        
        </div>
    );
}

export default RegisterJobSeeker;