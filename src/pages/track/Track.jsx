import React, { useState } from 'react';
import axios from 'axios';
import './track.css';
import Loader from '../../components/loader/Loader';

export default function Track() {
    const [trackData, setTrackData] = useState(null);
    const [loading, setLoading] = useState(false)

    const successIcon = 'https://cdn-icons-png.flaticon.com/512/845/845646.png'
    const failedIcon = 'https://cdn-icons-png.flaticon.com/512/1828/1828843.png'

    function trackApplication() {
        const appId = parseInt(document.getElementById('trackAppId').value);
        const phoneNo = document.getElementById('trackPhoneNo').value;

        if (!appId || !phoneNo) {
            alert("Please enter both Application ID and Phone Number.");
            return;
        }

        const postData = { appId, phoneNo };
        setLoading(true)
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload/loan/track`, postData)
            .then((res) => {
                if (res.data.success === true) {
                    setTrackData(res.data.result);
                } else {
                    setTrackData(null);
                    alert(res.data.errorMessage);
                }
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                setTrackData(null);
                console.error(err);
                alert('Failed to fetch your application. Please try again!');
            })
    }

    return (
        <main className="track-section">
            {
                loading?
                <Loader />:null
            }
            <div className="left-side">
                <h1>Track Your Application</h1>
                <div className="search-box">
                    <input type="text" placeholder="Enter Application ID" id="trackAppId" />
                </div>
                <div className="search-box">
                    <input type="text" placeholder="Enter Phone Number" id="trackPhoneNo" />
                </div>
                <button
                    type="submit"
                    className="submit-btn submit-btn-track"
                    onClick={trackApplication}
                >
                    Track
                </button>

                <div style={{ display: trackData ? 'block' : 'none' }}>
                    {trackData?.validation?.map((ele, index) => (
                        <div className="status-card" key={index}>
                            <div className="status-icon">
                                <img src={ele.validationSuccess? successIcon: failedIcon} alt="check icon" />
                            </div>
                            <div className="status-info">
                                <h3>{ele.validationField} Validation</h3>
                                <p>{ele.validationSuccess ? 'Passed' : 'Failed'}</p>
                            </div>
                        </div>
                    ))}

                    <div className="status-card">
                        <div className="status-icon">
                            <img src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" alt="status icon" />
                        </div>
                        <div className="status-info">
                            <h3>Comment</h3>
                            <p>{trackData?.result?.comment}</p>
                        </div>
                    </div>

                    <div className="status-card">
                        <div className="status-icon">
                            <img src="https://cdn-icons-png.flaticon.com/512/9913/9913615.png" alt="status icon" />
                        </div>
                        <div className="status-info">
                            <h3>Status</h3>
                            <p className={trackData?.result?.statusCode === 1? 'resultApproved' : trackData?.result?.statusCode === '2' ? 'resultManual' : 'resultReject'}>
                                {trackData?.result?.status}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right-side" style={{ display: trackData ? 'block' : 'none' }}>
                <div className="score-container">
                    <div className="circle">
                        <svg>
                            <circle cx="75" cy="75" r="70" style={{ stroke: '#ccc' }}></circle>
                            <circle
                            cx="75"
                            cy="75"
                            r="70"
                            style={{
                                'strokeDasharray': 440,
                                'strokeDashoffset': 440 - (440 * trackData?.result?.score) / 100,
                                'stroke': '#007b7b',
                                'transition': 'stroke-dashoffset 0.5s ease',
                            }}
                            ></circle>
                        </svg>
                        <div className="number">
                            <h2>{trackData?.result?.score}</h2>
                            <p>/100</p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
