import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import '../styles/Login.css'
import { useUserName } from "../components/UserContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setUserName } = useUserName()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/token/', { username, password });
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            if (res.status === 200) {
                setUserName(username)
                navigate('/');
            } else {
                alert('Login Unsuccessful!');
                navigate('/login');
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Login</h2>
                <div className="login-field">
                    <label htmlFor="username" className="login-label">Username</label>
                    <input
                        id="username"
                        type="text"
                        className="login-input"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>
                <div className="login-field">
                    <label htmlFor="password" className="login-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="login-input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <div className="register-link">
                <p>
                    Not registered? <a className="register-link-anchor" href="/register">Register here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
