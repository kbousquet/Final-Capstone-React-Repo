import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
   
    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
        navigate("/")
        }
    }, []);

    const login = async (e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:email,
                password: password,
            }),
        });
        const json = await res.json();
        if (json.authtoken) {
            sessionStorage.setItem('auth-token', json.authtoken);
        
            sessionStorage.setItem('email', email);
            navigate('/');
            window.location.reload()
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    if (error.param === 'email') setEmailError(error.msg);
                }
            } else {
                alert(json.error);
            }
        }
    };
   
    return (
        <div className="login-wrapper">
            <div className="login-container">
                <div className="login-text">
                    <h1>Login</h1>
                </div>
                <div className="login-text1" style={{textAlign: "left"}}>
                    New member? <span><a href="../Signup"> Sign Up</a></span>
                </div>
                <form onSubmit={login} noValidate>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={`form-control ${emailError ? 'is-invalid' : ''}`} placeholder="Enter your email" aria-describedby="helpId" />
                        <div className="error-container">
                            <div className="err">{emailError}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
                    </div>
                    <div className="btn-group">
                        <button type="submit" className="btn btn-submit mb-2 mr-1 waves-effect waves-light">Submit</button>
                        <button type="reset" className="btn btn-reset mb-2 waves-effect waves-light">Reset</button>
                    </div>
                    <br />
                    <div className="footer-text">
                        Forgot Password?
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;