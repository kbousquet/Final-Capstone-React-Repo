import React, { Component, useState } from 'react';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
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
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} required className={`form-control ${emailError ? 'is-invalid' : ''}`} placeholder="Enter your email" aria-describedby="helpId" />
                        <div className="error-container">
                            <div className="invalid-feedback">{emailError}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} required className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
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