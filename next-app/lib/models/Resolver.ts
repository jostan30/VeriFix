import mongoose from "mongoose";

const resolverSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    contactInfo: {
        type: {
            email: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            }
        },
        required: true
    },
    role: {
        type: String,
        enum: ['authority', 'ngo', 'charity'],
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    coverage: [{
        type: { 
            type: String, 
            enum: ["Polygon", "Point"], 
            default: "Point" 
        },
        coordinates: [[Number]]
    }],
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
    }
}, { timestamps: true });

const Resolver = mongoose.model('resolver', resolverSchema);
export default Resolver;