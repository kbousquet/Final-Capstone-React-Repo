import React, { useEffect, useState } from 'react';
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import './ReportsLayout.css';
import download from "../../Images/download.svg";

const PDF = process.env.PUBLIC_URL + "/patient_report.pdf";
// console.log(process.env.PUBLIC_URL/public);
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
                                <a href={PDF} target='_blank' rel='noopener noreferrer'>
                                    <button>View</button>
                                </a>
                            </td>
                            <td>
                                <a href={PDF} download="patient_report.pdf">
                                    <button>
                                        Download 
                                        <img src={download} alt="Download report" width="20px" height="20px" />
                                    </button>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsLayout;