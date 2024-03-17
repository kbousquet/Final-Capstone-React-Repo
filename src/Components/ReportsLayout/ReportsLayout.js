import React, { useEffect, useState } from 'react';
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import './ReportsLayout.css';
import download from "../../Images/download.svg";

const ReportsLayout = ({appointmentData}) => {

   

    return (
        <div className="reports-table-container">
            <h1>Reports</h1>
            <table className="reports-table">
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Provider</th>
                        <th>Specialty</th>
                        <th>View Report</th>
                        <th>Download Report</th>
                    </tr>
                </thead>
                <tbody>
                {appointmentData && appointmentData.length > 0 && appointmentData.map((app, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{app.doctorName}</td>
                            <td>{app.doctorSpeciality}</td>
                            <td>
                                <button onClick={() => handleView(index)}>View</button>
                            </td>
                            <td>
                                <button onClick={() => handleDownload(index)}>Download <img src={download} alt="Download report" width="20px" height="20px" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsLayout;