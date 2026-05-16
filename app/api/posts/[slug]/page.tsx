import clientPromise from '@/lib/mongodb';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default async function PostPage({ params }: { params: { slug: string } }) {
    const client = await clientPromise;
    const db = client.db('c2c-blog');
    const post = await db.collection('posts').findOne({ slug: params.slug });

    if (!post) {
    return (
    <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
        ← Back to home
        </Link>
        </main>
    );
}

return (
    <main className="max-w-2xl mx-auto px-4 py-12">
        <Link href="/" className="text-blue-500 hover:underline mb-8 inline-block">
        ← Back to home
        </Link>
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-400 mb-2">
        {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}
        </p>
        <div className="flex gap-2 mb-8">
        {post.tags.map((tag: string) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            {tag}
            </span>
        ))}
        </div>
        <article className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
    </main>
    );
}