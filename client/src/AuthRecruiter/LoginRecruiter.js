import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function LoginRecruiter() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = {username,password};
            const response = await axios.post('http://localhost:3001/authRecruiter/login', data);
            if (response.data.error) {
                alert(response.data.error);
            } else {
                sessionStorage.setItem("accessToken", response.data);
                alert('Login successful');
                navigate("/recruiter");
            }
        } catch (error) {
            console.error(error);
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
                Don't have an account? <Link to="/authRecruiter">Register here</Link>
            </p>
        </div>
    );
}

export default LoginRecruiter;