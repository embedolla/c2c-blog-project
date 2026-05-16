import clientPromise from '@/lib/mongodb';

export async function GET() {
    try {
    const client = await clientPromise;
    const db = client.db('c2c-blog');
    const posts = await db.collection('posts').find({}).sort({ date: -1 }).toArray();
    return Response.json(posts);
} catch (error) {
    return Response.json({ error: 'Failed to fetch posts' }, { status: 500 });
}
}