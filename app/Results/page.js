'use client'
import React, {useState, useEffect} from 'react';
import styles from "../page.module.css";
import {Navbar} from '@/components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCar, faLocationArrow, faLocationCrosshairs, faSpinner, faRotateRight} from '@fortawesome/free-solid-svg-icons';
import AutoComplete from './AutoComplete';

import { FeedbackLink } from '@/components';



/* Card Component */
const HovLaneCard = ({lane}) => (
    <div className={styles.card}>
        <div className={styles.details}>
            <h3 className={styles.titleLane}>
                {lane.name}
            </h3>
            <p className={styles.etaBox}>
                <span className={styles.carIcon}>
                    <FontAwesomeIcon icon={faCar} />
                </span>
                ETA: {lane.eta}
            </p>
            <button 
             className={styles.selectButton} onClick={() => window.open(lane.address)}>
                Select
                <span className={styles.arrowIcon}>
                    <FontAwesomeIcon icon={faLocationArrow} />
                </span>
            </button>
        </div>
    </div>
);

const Results = () => {

    const [location, setLocation] = useState("");
    const [coords, setCoords] = useState(null);
    const [hovLanes, setHovLanes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleUserLocation = () => {
        setLoading(true);
        setError("");

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                setCoords(coords); // Ensure only the string is stored
                console.log("📍 User Coordinates:", coords);
                setLoading(false);
            },
            (error) => {
                setLoading(false);
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        setError("Location access was denied. Please enable location access in your browser settings or enter your location manually");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setError("Location information is unavailable. Please try again or enter your location manually.");
                        break;
                    case error.TIMEOUT:
                        setError("Location request timed out. Please try again or enter your location manually.");
                        break;
                    default:
                        setError("An unknown error occurred. Please try again or enter your location manually.");
                }
            }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            setLoading(false)
        }
    };
    

    /* Triggers fetchHovLanes() when location or coords is provided */
    useEffect(() => {
        if (location || coords) {
            setError("");
            fetchHovLanes();
        }
    }, [location, coords]);

    // Auto-scroll when hovLanes has data
    useEffect(() => {
        if (hovLanes.length > 0) {
            window.scrollTo({
                top: -100,
                behavior: 'instant'
            });
        }
    }, [hovLanes]);

    /* Gets HOV lane results */
    const fetchHovLanes = async () => {
        setLoading(true);
        console.log("Sending request with:", { location, coords });
    
        try {
            const response = await fetch('/api/getHovLanes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location, coords }),
            });
    
            if (!response.ok) throw new Error('Failed to fetch data');
    
            const data = await response.json();
            setHovLanes(data);
            console.log("HOV Lanes Data:", data);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
        setLoading(false);
    };
    
    /* Sort HOV Lane results by ETA to display in order */
    const sortedLanes = hovLanes.sort((a, b) => {
        const etaA = parseInt(a.eta.replace(/\D/g, "")); 
        const etaB = parseInt(b.eta.replace(/\D/g, ""));
        return etaA - etaB; 
    });
    

    return (
        <div className={styles.page}>
            <div>
                <Navbar />
                <FeedbackLink />
            </div>

            <div className={styles.resultsPageSpacing}>
                {/* Hides location input elements when results are ready */}
                {hovLanes.length === 0 && (
                   <>

                    <AutoComplete onClick={fetchHovLanes} setLocation={setLocation}/>
                
                    <div className={styles.centerOrDiv}>
                        <h3 className={styles.orText}>
                            <span className={styles.orSpan}>OR</span>
                        </h3>
                    </div>

                    <button
                    className={styles.currentLocBtn}
                    onClick={handleUserLocation}>
                        USE CURRENT LOCATION
                        <FontAwesomeIcon icon={faLocationCrosshairs} />
                    </button>

                    {/* Gathering Current Location Error */}
                    {error && (
                        <div className={styles.currentLocErrorMsg}>
                            {error}
                        </div>
                    )}
                   </>
                )} 
            </div>
            
            {/* Renders loading icon */}
            {loading && (
                <div className={styles.loader}>
                    <FontAwesomeIcon icon={faSpinner} className={styles.spinnerIcon} />
                    <p>Getting Your Closest HOV Lanes...</p>
                </div>
            )}

            <div className={styles.hovResults}>
            
            {/* Renders Restart button */}
            {hovLanes.length > 0 && (
                <button
                    className={styles.restartBtn}
                    onClick={() => {
                        setLocation("");
                        setCoords(null);
                        setHovLanes([]);
                    }}
                >
                    Restart Search
                    <FontAwesomeIcon icon={faRotateRight} />
                </button> 
            )}
                {/* Renders result cards */}
                {sortedLanes.map((lane, index) => (
                <HovLaneCard key={index} lane={lane} /> 
                ))}
            </div>

        </div>
    );
};

export default Results