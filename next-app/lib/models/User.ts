import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  authProvider: "local" | "google" | "facebook";
  passwordHash?: string;
  email: string;
  phoneNumber: string;
  role: "citizen" | "admin";
  rating: number;
  otp?: string;
  otpExpiry?: Date;
  isVerified: boolean;
  last2FAVerifiedAt?: Date; // 🔹 new field for timestamp
}

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
    },
    otp:{
        type: String
    },
    otpExpiry: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    last2FAVerifiedAt: { 
        type: Date 
    }   
});

// userSchema.index({ email: 1 }, { unique: true });
// userSchema.index({ phoneNumber: 1 }, { unique: true });

const User = mongoose.models.user || mongoose.model('user', userSchema);
export default User;
