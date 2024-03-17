import React, { useState, useEffect } from 'react';
import './ReviewForm.css';
import { FaStar } from 'react-icons/fa';

const ReviewForm = ({appointmentData, toggleAppointmentData}) => {
    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentReview, setCurrentReview] = useState('');
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [currentRating, setCurrentRating] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)

    const handleWriteReview = (index) => {
        setSelectedRowIndex(index);
        setShowModal(true);
    };

    const handleStarClick = (value) => {
        setCurrentRating(value);
    }

    const handleMouseOver = (newHoverValue) => {
        setHoverValue(newHoverValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    }

    const handleReviewSubmit = () => {
        appointmentData[selectedRowIndex].reviewGiven = currentReview;
        appointmentData[selectedRowIndex].rating  = currentRating;
        toggleAppointmentData(appointmentData[selectedRowIndex], "update");
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="table-container">
            <h1>Reviews</h1>
            <table className="reviews-table">
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Provider</th>
                        <th>Specialty</th>
                        <th>Provide Review</th>
                        <th>Review Given</th>
                    </tr>
                </thead>
                <tbody>
                    {appointmentData && appointmentData.length > 0 && appointmentData.map((app, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{app.doctorName}</td>
                            <td>{app.doctorSpeciality}</td>
                            <td>
                                <button onClick={() => handleWriteReview(index)} className={app.reviewGiven ? 'disabled' : ''} disabled={app.reviewGiven}>Write Review</button>
                            </td>
                            <td className='review-given'>
                                <div className="review-text">{app.reviewGiven || ''}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h1>Write Your Review</h1>
                        <div className="form-contents">
                            <label htmlFor="name">Name</label>
                            <input className="form-control" type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" aria-describedby="helpId" />
                            <label htmlFor="review-text">Review</label>
                            <textarea
                                id="review-text"
                                value={currentReview}
                                onChange={(e) => setCurrentReview(e.target.value)}
                                placeholder="Write your review here"
                                className="non-resizable form-control"
                            ></textarea>
                            <label htmlFor="rating">Rating</label>
                            <div className="ratings-container">
                                {stars.map((_, index) => {
                                return (
                                    <FaStar
                                    key={index}
                                    size={24}
                                    onClick={() => handleStarClick(index + 1)}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                    className={(hoverValue || currentRating) > index ? "orange" : "grey"}
                                    style={{
                                        marginRight: 10,
                                        cursor: "pointer"
                                    }}
                                    />
                                )
                                })}
                            </div>
                            <button className="btn btn-submit mb-2 mr-1 waves-effect waves-light" onClick={handleReviewSubmit}>Submit Review</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewForm;