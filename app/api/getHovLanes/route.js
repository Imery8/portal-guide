export async function POST(req) {
    try {
        const { location, coords } = await req.json();

        const testData = [
            { name: 'HOV Lane 1', eta: '25', address: 'Link  1' },
            { name: 'HOV Lane 2', eta: '57', address: 'Link 2' },
            { name: 'HOV Lane 3', eta: '10', address: 'Link 3' },
        ];

        return Response.json(testData, { status: 200 });
    } catch (error) {
        return Response.json({ error: 'Failed to fetch HOV lanes' }, { status: 500 });
    }
}
