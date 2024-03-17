import React, { useEffect, useState } from 'react';
import './ProfileCard.css';

const ProfileCard = ({expanded}) => {

    return (
        <>
            <div className={(expanded ? 'profile-container profile-expanded' : 'profile-container')}>
                <>
                    <p>
                        Your Profile
                    </p>
                </>
            </div>
        </>
    );
};

export default ProfileCard;