import React, { useState } from 'react';
import './Sign_Up.css';

function Signup() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameError('');
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        setPhoneError('');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address.');
        }

        // Name validation
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            setNameError('Please enter a valid name.');
        }

        // Phone validation
        if (!/^\d{10}$/.test(phone)) {
            setPhoneError('Please enter a valid 10-digit phone number.');
        }
    };

    return (
        <div className="signup-wrapper">
            <div className="signup-container">
                <div className="signup-text">
                    <h1>Sign Up</h1>
                </div>
                <div className="signup-text1" style={{textAlign: "left"}}>
                    Already a member? <span><a href="../Login"> Login</a></span>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={handleNameChange} required className={`form-control ${nameError ? 'is-invalid' : ''}`} placeholder="Enter your name" aria-describedby="helpId" />
                        <div className="error-container">
                            <div className="invalid-feedback">{nameError}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" name="phone" id="phone" value={phone} onChange={handlePhoneChange} required className={`form-control ${phoneError ? 'is-invalid' : ''}`} placeholder="Enter your phone number" aria-describedby="helpId" />
                        <div className="error-container">
                            <div className="invalid-feedback">{phoneError}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} required className={`form-control ${emailError ? 'is-invalid' : ''}`} placeholder="Enter your email" aria-describedby="helpId" />
                        <div className="error-container">
                            <div className="invalid-feedback">{emailError}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} required className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
                    </div>
                    <div className="btn-group">
                        <button type="submit" className="btn btn-submit mb-2 mr-1 waves-effect waves-light">Submit</button>
                        <button type="reset" className="btn btn-reset mb-2 waves-effect waves-light">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;