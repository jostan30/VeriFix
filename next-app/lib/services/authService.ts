import bcrypt from "bcryptjs";
import User, { IUser } from "@/lib/models/User";
import { generateOTP, sendOTP } from "../utils/otpHelper";
import { dbConnect } from "../db/dbConnection";

// Custom error types
class AuthError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

interface SignupDTO {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  otpMethod: "email" | "phone";
}

interface VerifyOTPDTO {
  phoneNumber?: string;
  email?: string;
  otp: string;
}

export class AuthService {
  // Signup user
  static async signup(data: SignupDTO) {
    try {
      await dbConnect();

      const existing = await User.findOne<IUser>({ $or: [{ email: data.email }, { phoneNumber: data.phoneNumber }] });
      if (existing) throw new AuthError("User with this email or phone number already exists", 409);

      const passwordHash = await bcrypt.hash(data.password, 10);
      const otp = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

      const user = await User.create<IUser>({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        passwordHash,
        otp,
        otpExpiry,
        isVerified: false,
        authProvider: 'local',
        role: 'citizen',
        rating: 0
      });

      await sendOTP(data.otpMethod,data.email, otp); // email or SMS later

      return { message: "Signup successful. OTP sent.", userId: user._id };
    } catch (error: any) {
      // Detect MongoDB connection errors
      if (error.name === "MongooseServerSelectionError") {
        throw new AuthError("Database connection failed. Please check your MongoDB URI.", 500);
      }

      // Detect duplicate key errors
      if (error.code === 11000) {
        throw new AuthError("Duplicate entry detected. Email or phone already exists.", 409);
      }

      // Custom errors
      if (error instanceof AuthError) {
        throw error;
      }

      // Fallback
      console.error("Unexpected signup error:", error);
      throw new AuthError("Unexpected error during signup", 500);
    }
  }

  // Verify OTP
  static async verifyOTP(data: VerifyOTPDTO) {
    try {
      await dbConnect();

      const user = await User.findOne<IUser>({ $or: [{ email: data.email }, { phoneNumber: data.phoneNumber }] });
      if (!user) throw new AuthError("User not found", 404);

      if (!user.otp || !user.otpExpiry) throw new AuthError("OTP has not been generated", 400);
      if (new Date() > user.otpExpiry) throw new AuthError("OTP expired", 400);
      if (user.otp !== data.otp) throw new AuthError("Invalid OTP", 400);

      user.otp = undefined;
      user.otpExpiry = undefined;
      user.isVerified = true;
      user.last2FAVerifiedAt = new Date();
      await user.save();

      return { message: "OTP verified successfully" };
    } catch (error: any) {
      if (error instanceof AuthError) {
        throw error;
      }

      console.error("Unexpected OTP verification error:", error);
      throw new AuthError("Unexpected error during OTP verification", 500);
    }
  }
}
