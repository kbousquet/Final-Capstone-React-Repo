import React, { useEffect, useState } from 'react';
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import './ProfileCard.css';

const ProfileCard = ({expanded}) => {

    const [userDetails, setUserDetails] = useState({});
    const [updatedDetails, setUpdatedDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
        
    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
            navigate("/login");
        } else {
            fetchUserProfile();
        }
    }, [navigate]);
    
    const fetchUserProfile = async () => {
        try {
                const authtoken = sessionStorage.getItem("auth-token");
                const email = sessionStorage.getItem("email"); // Get the email from session storage
            if (!authtoken) {
                navigate("/login");
            } else {
            const response = await fetch(`${API_URL}/api/auth/user`, {
                headers: {
                "Authorization": `Bearer ${authtoken}`,
                "Email": email, // Add the email to the headers
                },
            });
            if (response.ok) {
                const user = await response.json();
                setUserDetails(user);
                setUpdatedDetails(user);
            } else {
                // Handle error case
                throw new Error("Failed to fetch user profile");
            }
            }
        } catch (error) {
            console.error(error);
            // Handle error case
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };
    const handleInputChange = (e) => {
        setUpdatedDetails({
            ...updatedDetails,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const authtoken = sessionStorage.getItem("auth-token");
        const email = sessionStorage.getItem("email"); // Get the email from session storage

        if (!authtoken || !email) {
            navigate("/login");
            return;
        }
        const payload = { ...updatedDetails };
        const response = await fetch(`${API_URL}/api/auth/user`, {
            method: "PUT",
            headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Content-Type": "application/json",
            "Email": email,
            },
            body: JSON.stringify(payload),
        });
        if (response.ok) {
            // Update the user details in session storage
            sessionStorage.setItem("name", updatedDetails.name);
            sessionStorage.setItem("phone", updatedDetails.phone);
            setUserDetails(updatedDetails);
            setEditMode(false);
            // Display success message to the user
            alert(`Profile Updated Successfully!`);
            navigate("/");
        } else {
            // Handle error case
            throw new Error("Failed to update profile");
        }
        } catch (error) {
        console.error(error);
        // Handle error case
        }
    };

    return (
        <div className={(expanded ? 'profile-container profile-expanded' : 'profile-container')}>
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <label className="profile-email" htmlFor="profile-email">Email</label>
                    <input
                        type="email"
                        id="profile-email"
                        name="email"
                        value={userDetails.email}
                        disabled
                    />
                    <label htmlFor="profile.name">Name</label>
                    <input
                    type="text"
                    id="profile-name"
                    name="name"
                    value={updatedDetails.name}
                    onChange={handleInputChange}
                    />
                    <label htmlFor="profile-phone">Phone</label>
                    <input
                    type="text"
                    id="profile-phone"
                    name="phone"
                    value={updatedDetails.phone}
                    onChange={handleInputChange}
                    />
                    <button className="save-btn" type="submit">Save</button>
                </form>
                ) : (
                <div className="profile-details">
                    <h1>Welcome, {userDetails.name}</h1>
                    <div className="profile-items">
                        <p><b>Email:</b> {userDetails.email}</p>
                        <p><b>Phone:</b> {userDetails.phone}</p>
                    </div>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;