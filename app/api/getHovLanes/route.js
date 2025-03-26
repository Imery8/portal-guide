import DurationCalculator from "@/app/api/getHovLanes/DurationCalculator";
import query from "@/app/api/getHovLanes/database"

export async function POST(req) {
    try {
        const {coords, location}  = await req.json();
        const dests = await query(coords || location);
        console.log(dests);
        const coords1 = `${coords.latitude}%2C${coords.longitude}`;
        const location1 = `${location.lat}%2c${location.lng}`
        const destination = dests;
        console.log(coords1);
        console.log(location1);
        const response = await DurationCalculator(coords1 || location1, destination);
        const durationText = response;
        const googleMapsLink = `https://www.google.com/maps/dir/${coords1 || location1}/${destination}`;
        const testData = [
            { name: 'HOV Lane 1', eta: durationText, address: googleMapsLink },
            { name: 'HOV Lane 2', eta: '57', address: 'Link 2' },
            { name: 'HOV Lane 3', eta: '10', address: 'Link 3' },
        ];
        
        return Response.json(testData, { status: 200 });
    } catch (error) {
        console.error("Handler Error:", error);
        return Response.json({ error: 'Failed to fetch HOV lanes' }, { status: 500 });
    }
}

