import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        enum: ['citizen', 'admin'],
        default: 'citizen'
    },
    rating: {
        type: Number,
        default: 0.0,
    }
});

const User = mongoose.model('user', userSchema);
export default User;