import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    date: { type: Date, default: Date.now },
    tags: [String],
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);