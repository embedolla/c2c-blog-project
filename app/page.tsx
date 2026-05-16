import clientPromise from '@/lib/mongodb';
import Link from 'next/link';

export default async function Home() {
  const client = await clientPromise;
  const db = client.db('c2c-blog');
  const posts = await db.collection('posts').find({}).sort({ date: -1 }).toArray();

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">My Blog</h1>
      <p className="text-gray-500 mb-10">Thoughts on tech, projects, and everything in between.</p>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post._id.toString()} className="border-b pb-8">
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-400 text-sm mt-1">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <div className="flex gap-2 mt-2">
              {post.tags.map((tag: string) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3 text-gray-700">{post.excerpt}</p>
            <Link href={`/posts/${post.slug}`} className="text-blue-500 text-sm mt-2 inline-block hover:underline">
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}