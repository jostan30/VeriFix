import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    status: { 
        type: String, 
        default: "pending"
    },
    reportedAt: { 
        type: Date, 
        default: Date.now() 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now() 
    }
}, { timestamps: true });

const Issue = mongoose.model('issue', issueSchema);
export default Issue;