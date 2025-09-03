import crypto from "crypto";
import nodemailer from "nodemailer";

// Generate numeric OTP
export function generateOTP(length = 6): string {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
}

// Mock sending email/SMS (replace with real provider later)
export async function sendOTP(otpMethod:string ,to: string, otp: string) {
  if( otpMethod === "email") {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,    
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `"VerFix" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
      html: `<p>Your OTP code is: <b>${otp}</b></p>`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("OTP email sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending OTP email:", error);
      throw new Error("Failed to send OTP email");
    }
    
  }
  else if(otpMethod === "phone") {
    console.log(`Sending OTP ${otp} to phone: ${to}`);
    // Integrate with SMS service like Twilio, Nexmo, etc.
  }
}
