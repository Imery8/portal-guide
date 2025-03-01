import DurationCalculator from "@/app/api/getHovLanes/DurationCalculator";

export async function POST(req) {
    try {
        const {coords, location}  = await req.json();
        //console.log(location1);
        const destination = "29.79051%2C-95.33971";
        console.log(coords);
        console.log(location);
        const response = await DurationCalculator(coords || location, destination);
        const durationText = response;
        const googleMapsLink = `https://www.google.com/maps/dir/${coords || location}/${destination}`;
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

