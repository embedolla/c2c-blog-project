import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
    const client = await clientPromise;
    const db = client.db('c2c-blog');
    const collections = await db.listCollections().toArray();
    return Response.json({ 
        status: 'Connected!', 
        collections: collections.map(c => c.name) 
    });
} catch (error) {
    return Response.json({ status: 'Error', error: error.message });
}
}