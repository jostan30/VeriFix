import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    authProvider: { 
        type: String, 
        enum: ['local', 'google', 'facebook'], 
        default: 'local' 
    },
    passwordHash: { 
        type: String 
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

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phoneNumber: 1 }, { unique: true });

const User = mongoose.model('user', userSchema);
export default User;