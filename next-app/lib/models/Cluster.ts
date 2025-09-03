import mongoose from "mongoose";

const clusterSchema = new mongoose.Schema({
    center: {
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
    category: {
        type: String,
        required: true
    },
    issueCount: { 
        type: Number, 
        default: 0 
    },
    severity: {
        type: Number,
        default: 0.0
    }
});

clusterSchema.index({ center: "2dsphere" });

const Cluster = mongoose.model('cluster', clusterSchema);
export default Cluster;