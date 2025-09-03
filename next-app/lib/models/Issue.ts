import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const issueSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    cluster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cluster'
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
        type: { 
            type: String, 
            enum: ["Point"], 
            default: "Point" 
        },
        coordinates: { 
            type: [Number], 
            required: true 
        }
    },
    assignedResolver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "resolver" 
    },
    status: { 
        type: String, 
        enum: ["pending", "in_progress", "resolved", "rejected"], 
        default: "pending" 
    },
    reportedAt: { 
        type: Date, 
        default: Date.now() 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now() 
    },
    supporters: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user" 
    }],
    comments: {
        type: [commentSchema]
    }
}, { timestamps: true });

issueSchema.index({ location: "2dsphere" });
issueSchema.index({ status: 1 });

const Issue = mongoose.model('issue', issueSchema);
export default Issue;