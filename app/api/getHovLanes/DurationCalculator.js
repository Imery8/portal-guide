const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const DISTANCE_MATRIX_URL = "https://maps.googleapis.com/maps/api/distancematrix/json";

const DurationCalculator = async (origin, destination) => {

    try {
        console.log("Calculating duration...");
        console.log("Origin:", origin);
        console.log("Destination:", destination);
        //console.log("Using API Key:", GOOGLE_MAPS_API_KEY ? "Loaded" : "Missing");

        if (!GOOGLE_MAPS_API_KEY) {
            throw new Error("Missing API Key! Ensure it's set in .env.local");
        }

        //console.log(GOOGLE_MAPS_API_KEY);
        const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination}&origins=${origin}&key=${GOOGLE_MAPS_API_KEY}`);

        //console.log("API Response Status:", response.status);
        //console.log("Full API Response:", JSON.stringify(response.data, null, 2));

        if (response.data.status !== 'OK') {
            throw new Error(`Google API returned an error: ${response.data.status} - ${response.data.error_message || "No error message"}`);
        }

        const element = response.data.rows[0]?.elements[0];
        if (!element || element.status !== 'OK') {
            throw new Error(`Invalid response element: ${JSON.stringify(element)}`);
        }

        const durationText = element.duration?.text;
        if (!durationText) {
            throw new Error("Duration data is missing in API response");
        }

        //console.log("Duration Text:", durationText);
        return durationText; // Example: "25 mins"
    } catch (error) {
        console.error("Error fetching duration:", error.message);
        throw new Error("Failed to calculate duration");
    }
};

export default DurationCalculator;
