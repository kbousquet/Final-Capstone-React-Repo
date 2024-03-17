import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

const ReviewForm = ({appointmentData}) => {
    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentReview, setCurrentReview] = useState('');
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);

    const handleWriteReview = (index) => {
        setSelectedRowIndex(index);
        setShowModal(true);
    };

    const handleReviewSubmit = () => {
        appointmentData[selectedRowIndex].reviewGiven = currentReview;
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
                            <button className="btn btn-submit mb-2 mr-1 waves-effect waves-light" onClick={handleReviewSubmit}>Submit Review</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewForm;