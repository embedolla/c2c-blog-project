import { MongoClient } from 'mongodb';

import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;


const samplePosts = [
    {
    title: "My First Blog Post",
    slug: "my-first-post",
    excerpt: "This is an about me...",
    content: `# My First Blog Post\n\nWelcome to my blog! I'm excited to share my thoughts here.\n\n## What to Expect\n\nI'll be writing about tech, projects, and lessons learned.`,
    date: new Date(),
    tags: ["intro", "personal"],
},
{
    title: "What I Learned About Next.js",
    slug: "nextjs-learnings",
    excerpt: "deep dive into the App Router and server components...",
    content: `# Next.js App Router\n\nNext.js 13+ introduced the App Router, a big shift from Pages Router.\n\n## Server Components\n\nBy default, components in the app directory are server components, meaning they run on the server and send HTML to the browser.`,
    date: new Date(),
    tags: ["nextjs", "webdev"],
},
{
    title: "Getting Started with MongoDB",
    slug: "getting-started-mongodb",
    excerpt: "beginner's guide to NoSQL databases...",
    content: `# Getting Started with MongoDB\n\nMongoDB is a NoSQL database that stores data as flexible JSON-like documents.\n\n## Why MongoDB?\n\nUnlike SQL databases, MongoDB doesn't require a rigid schema, making it perfect for projects that evolve over time.`,
    date: new Date(),
    tags: ["mongodb", "database"],
},
];

async function seed() {
    const client = new MongoClient(uri);
    try {
    await client.connect();
    console.log('Connected to MongoDB!');
    const db = client.db('c2c-blog');
    const collection = db.collection('posts');

    // Clear existing posts first
    await collection.deleteMany({});
    console.log('Cleared existing posts');

    // Insert sample posts
    await collection.insertMany(samplePosts);
    console.log('✅ Database seeded with', samplePosts.length, 'posts!');
} catch (error) {
    console.error('Error seeding database:', error);
} finally {
    await client.close();
}
}

seed();