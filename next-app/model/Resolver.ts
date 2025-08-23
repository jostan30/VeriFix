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
    sector: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Resolver = mongoose.model('resolver', resolverSchema);
export default Resolver;