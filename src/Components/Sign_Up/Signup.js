import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Sign_Up.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showEmailErr, setshowEmailErr] = useState('');
    const [showEmailExistErr, setshowEmailExistErr] = useState('');
    const [showPhoneErr, setshowPhoneErr] = useState('');
    const [showNameErr, setshowNameErr] = useState('');
    const [showPWErr, setshowPWErr] = useState('');

    const navigate = useNavigate();
    
    const register = async (e) => {
        e.preventDefault();

        // Reset errors
        setshowEmailErr('');
        setshowNameErr('');
        setshowPhoneErr('');
        setshowPWErr('');
        setshowEmailExistErr('');

        // API Call
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });
        const json = await response.json();
        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            
            // Redirect to home page
            navigate("/");
            window.location.reload();
        } else {
            if (typeof json.error === "string") {
                setshowEmailExistErr(json.error);
            } else {
                for (const error of json.error) {
                    switch(error.param) {
                    case "email":
                        setshowEmailErr(error.msg);
                        break;
                    case "name":
                        setshowNameErr(error.msg);
                        break;
                    case "password":
                        setshowPWErr(error.msg);
                        break;
                    case "phone":
                        setshowPhoneErr(error.msg);
                        break;
                    }
                }
            }

        }
    };

    const handleReset = () => {
        setEmail('');
        setName('');
        setPassword('');
        setPhone('');
        setshowEmailErr('');
        setshowNameErr('');
        setshowPhoneErr('');
        setshowPWErr('');
        setshowEmailExistErr('');
    }


    return (
        <div className="signup-wrapper">
            <div className="signup-container" onClick={(e) => e.stopPropagation()}>
                <div className="signup-text">
                    <h1>Sign Up</h1>
                </div>
                <div className="signup-text1" style={{textAlign: "left"}}>
                    Already a member? <span><a href="../Login"> Login</a></span>
                </div>
                <form method="POST" onSubmit={register} noValidate>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required className={`form-control ${showNameErr ? 'is-invalid' : ''}`} placeholder="Enter your name" aria-describedby="helpId" />
                        <div className="error-container">
                            {showNameErr && <div className="err">{showNameErr}</div>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className={`form-control ${showPhoneErr ? 'is-invalid' : ''}`} placeholder="Enter your phone number" aria-describedby="helpId" />
                        <div className="error-container">
                            {showPhoneErr && <div className="err">{showPhoneErr}</div>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={`form-control ${(showEmailErr || showEmailExistErr) ? 'is-invalid' : ''}`} placeholder="Enter your email" aria-describedby="helpId" />
                        <div className="error-container">
                            {showEmailErr && <div className="err">{showEmailErr}</div>}
                            {showEmailExistErr && <div className="err">{showEmailExistErr}</div>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={`form-control ${showPWErr ? 'is-invalid' : ''}`} placeholder="Enter your password" aria-describedby="helpId" />
                        <div className="error-container">
                            {showPWErr && <div className="err">{showPWErr}</div>}
                        </div>
                    </div>
                    <div className="btn-group">
                        <button type="submit" className="btn btn-submit mb-2 mr-1 waves-effect waves-light">Submit</button>
                        <button type="reset" className="btn btn-reset mb-2 waves-effect waves-light" onClick={handleReset}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;