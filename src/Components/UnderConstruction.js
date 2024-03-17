import React from 'react';
import './UnderConstruction.css';
import constructionImg from '../Images/under-construction.svg';

const UnderConstruction = () => {
    
    return (
        <div id="underConstruction-wrapper">
            <div className='flex-column'>
                <h1>We're Sorry...</h1>
                <p>This page is under construction</p>
            </div>
            <img src={constructionImg} alt="health-tips"></img> 
        </div>
    )
}

export default UnderConstruction;