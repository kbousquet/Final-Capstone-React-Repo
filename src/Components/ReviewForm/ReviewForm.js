import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
    const [name, setName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentReview, setCurrentReview] = useState('');
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);

    const handleWriteReview = (index) => {
        setSelectedRowIndex(index);
        setShowModal(true);
    };

    const handleReviewSubmit = () => {
        const updatedReviews = [...reviews];
        updatedReviews[selectedRowIndex].reviewGiven = currentReview;
        // You can perform any further actions with the updatedReviews, like sending to a server or storing in state
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const str = localStorage.getItem("appointmentData");
        const storedAppointmentData = JSON.parse(str);

        if (storedAppointmentData) {
            setAppointmentData(storedAppointmentData);
        }
    }, []);

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
                {reviews.map((review, index) => (
                    <tr key={index}>
                    <td>{review.serialNumber}</td>
                    <td>{review.provider}</td>
                    <td>{review.specialty}</td>
                    <td>
                        <button onClick={() => handleWriteReview(index)}>Write Review</button>
                    </td>
                    <td className='review-given'>{review.reviewGiven || ''}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                <label for="name">Name</label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" aria-describedby="helpId" />
                <label for="review-text">Review</label>
                    <textarea
                    id="review-text"
                    value={currentReview}
                    onChange={(e) => setCurrentReview(e.target.value)}
                    placeholder="Write your review here"
                    className="non-resizable"
                    ></textarea>
                    <button className="btn btn-submit mb-2 mr-1 waves-effect waves-light" onClick={handleReviewSubmit}>Submit Review</button>
                </div>
                </div>
            )}
        </div>
    );
};

// Example usage:
const reviews = [
  { serialNumber: 1, provider: 'John Doe', specialty: 'Cardiology', reviewGiven: null },
  { serialNumber: 2, provider: 'Jane Smith', specialty: 'Dermatology', reviewGiven: null },
  // Add more reviews as needed
];

export default ReviewForm;