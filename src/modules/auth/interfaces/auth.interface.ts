import { SignupDto, LoginDto, ConfirmSignupCodeDto, ForgotPasswordDto } from '../dto';

export interface IAuthService {
  signup(signupDto: SignupDto): Promise<any>;
  login(loginDto: LoginDto): Promise<any>;
  confirmSignupCode(confirmSignupCodeDto: ConfirmSignupCodeDto): Promise<any>;
  forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any>;
}
