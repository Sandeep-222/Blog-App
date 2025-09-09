import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api";
import '../styles/Register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/user/create/', { username, email, password });
            if (res.status === 201) {
                navigate('/login');
            } else {
                alert("Registering is Unsuccessful!");
                navigate('/register');
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2 className="register-title">Register</h2>
                <div className="register-field">
                    <label htmlFor="username" className="register-label">Username</label>
                    <input
                        id="username"
                        type="text"
                        className="register-input"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                        autoComplete="username"
                    />
                </div>
                <div className="register-field">
                    <label htmlFor="email" className="register-label">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="register-input"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        autoComplete="email"
                    />
                </div>
                <div className="register-field">
                    <label htmlFor="password" className="register-label">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="register-input"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        autoComplete="new-password"
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
             <div className="login-link">
                <p>
                    Already registered? <a href="/login" className="login-link-anchor">Login here</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
