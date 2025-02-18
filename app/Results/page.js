'use client'
import React, {useState, useEffect} from 'react';
import styles from "../page.module.css";
import {Navbar} from '@/components';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCar, faLocationArrow, faLocationCrosshairs} from '@fortawesome/free-solid-svg-icons';

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
                ETA: {lane.eta}m
            </p>
            <button 
             className={styles.selectButton}>
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

    /* Gets user's location */
    const handleUserLocation =() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCoords({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        if (location || coords) {
            fetchHovLanes();
        }
    }, [location, coords]);

    /* Gets HOV lane results */
    const fetchHovLanes = async () => {
        console.log(coords);
        
        const testData = [
            { name: 'HOV Lane 1', eta: '25', address: '123 this drive' },
            { name: 'HOV Lane 2', eta: '57', address: '456 next ave' },
            { name: 'HOV Lane 3', eta: '10', address: '789 after turn' },

        ];
        setHovLanes(testData);
    };

    return (
        <div className={styles.page}>
            <div>
                <Navbar />
            </div>

            <div className={styles.resultsPageSpacing}>
                <input
                 className={styles.locationInput}
                 type="text"
                 placeholder="Enter your location"
                 value={location}
                 onChange={(e) => setLocation(e.target.value)}>
                </input>

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
            </div>

            <div className={styles.hovResults}>
                {hovLanes.map((lane, index) => (
                <HovLaneCard key={index} lane={lane} /> 
                ))}
 
            </div>

        </div>
    );
};

export default Results