import DurationCalculator from "@/app/api/getHovLanes/DurationCalculator";
import AutoComplete from "./AutoCompleteComponent/AutoComplete";
import { getLatLng } from "use-places-autocomplete";

export async function POST(req) {
    try {
        const {coords, location}  = await req.json();
        //console.log(location);
        const destination = "29.79051%2C-95.33971";
        if (!coords) throw new Error('Missing parameters');
        console.log(coords);
        const response = await DurationCalculator(coords, destination);
        const durationText = response;

        const testData = [
            { name: 'HOV Lane 1', eta: durationText, address: 'Link 1' },
            { name: 'HOV Lane 2', eta: '57', address: 'Link 2' },
            { name: 'HOV Lane 3', eta: '10', address: 'Link 3' },
        ];
        
        return Response.json(testData, { status: 200 });
    } catch (error) {
        console.error("Handler Error:", error);
        return Response.json({ error: 'Failed to fetch HOV lanes' }, { status: 500 });
    }
}

