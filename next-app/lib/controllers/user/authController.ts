import { AuthService } from "@/lib/services/authService";

export class AuthController {
  static async signup(req: Request) {
    const body = await req.json();
    return AuthService.signup(body);
  }

  static async verifyOTP(req: Request) {
    const body = await req.json();
    return AuthService.verifyOTP(body);
  }

  static async login(req: Request) {
    const body = await req.json();
    return AuthService.login(body);
  }
}
