import DurationCalculator from "@/app/api/getHovLanes/DurationCalculator";
import query from "@/app/api/getHovLanes/database"

export async function POST(req) {
    try {
        const {coords, location}  = await req.json();
        const dests = await query(coords || location);
        const destination1 = `${dests[0][0].latitude}%2C${dests[0][0].longitude}`;
        const destination2 = `${dests[0][1].latitude}%2C${dests[0][1].longitude}`;
        const destination3 = `${dests[0][2].latitude}%2C${dests[0][2].longitude}`;
        if (location != ""){
            const location1 = `${location.latitude}%2c${location.longitude}` 
            const name1 = dests[0][0].road_name;
            const name2 = dests[0][1].road_name;
            const name3 = dests[0][2].road_name;
            const response = await DurationCalculator(location1, destination1);
            const durationText1 = response;
            const response1 = await DurationCalculator(location1, destination2);
            const durationText2 = response1;
            const response2 = await DurationCalculator(location1, destination1);
            const durationText3 = response2;
            const googleMapsLink1 = `https://www.google.com/maps/dir/${ location1}/${destination1}`;
            const googleMapsLink2 = `https://www.google.com/maps/dir/${ location1}/${destination2}`;
            const googleMapsLink3 = `https://www.google.com/maps/dir/${ location1}/${destination3}`;
            const testData = [
                { name: name1, eta: durationText1, address: googleMapsLink1 },
                { name: name2, eta: durationText2, address: googleMapsLink2 },
                { name: name3, eta: durationText3, address: googleMapsLink3 },
            ];
            
            return Response.json(testData, { status: 200 });
        }else{
            const location1 = `${coords.latitude}%2c${coords.longitude}` 
            const name1 = dests[0][0].road_name;
            const name2 = dests[0][1].road_name;
            const name3 = dests[0][2].road_name;
            const response = await DurationCalculator(location1, destination1);
            const durationText1 = response;
            const response1 = await DurationCalculator(location1, destination2);
            const durationText2 = response1;
            const response2 = await DurationCalculator(location1, destination1);
            const durationText3 = response2;
            const googleMapsLink1 = `https://www.google.com/maps/dir/${ location1}/${destination1}`;
            const googleMapsLink2 = `https://www.google.com/maps/dir/${ location1}/${destination2}`;
            const googleMapsLink3 = `https://www.google.com/maps/dir/${ location1}/${destination3}`;
            const testData = [
                { name: name1, eta: durationText1, address: googleMapsLink1 },
                { name: name2, eta: durationText2, address: googleMapsLink2 },
                { name: name3, eta: durationText3, address: googleMapsLink3 },
            ];
            
            return Response.json(testData, { status: 200 });
        }
        }catch (error) {
            console.error("Handler Error:", error);
            return Response.json({ error: 'Failed to fetch HOV lanes' }, { status: 500 });
        }


}

