import { Body, Controller, HttpStatus, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseDto } from 'src/shared/dtos';
import { ChangePasswordDto, ConfirmSignupCodeDto, ForgotPasswordDto, LoginDto, ResendCodeDto, SaveRepresentationDto, SignupDto, VerifyForgotPasswordOtpDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/guards';
import { User } from 'src/shared/decorators';
import { SanitizeInputPipe } from './pipe/auth.pipe';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign Up' })
  @UsePipes(SanitizeInputPipe)
  @Post('signup')
  async signUp(@Body() signupDto: SignupDto) {
    console.log(signupDto);

    const resp = await this.authService.signup(signupDto);
    return new ResponseDto(HttpStatus.CREATED, 'Account created successfully!', resp).toJSON();
  }

  @ApiOperation({ summary: 'Confirm Sign Up' })
  @Post('confirm-signup')
  async confirmSignupCode(@Body() confirmSignupCodeDto: ConfirmSignupCodeDto) {
    const resp = await this.authService.confirmSignupCode(confirmSignupCodeDto);
    return new ResponseDto(HttpStatus.CREATED, 'Account verified successfully!', resp).toJSON();
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const resp = await this.authService.login(loginDto);
    return new ResponseDto(HttpStatus.OK, 'User logged in successfully!', resp).toJSON();
  }

  @ApiOperation({ summary: 'Resend Code' })
  @Post('resend-code')
  async resendCode(@Body() resendCodeDto: ResendCodeDto) {
    await this.authService.resendCode(resendCodeDto);
    return new ResponseDto(HttpStatus.OK, 'Code resent successfully!');
  }

  @ApiOperation({ summary: 'Add Representation' })
  @UseGuards(JwtAuthGuard)
  @Post('save-representation')
  async saveRepresentation(@Body() saveRepresentationDto: SaveRepresentationDto, @User('id') userId: number) {
    const resp = await this.authService.saveRepresentation(saveRepresentationDto, userId);
    return new ResponseDto(HttpStatus.OK, 'Representation saved successfully!', resp).toJSON();
  }

  @ApiOperation({ summary: 'Forgot Password' })
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.authService.forgotPassword(forgotPasswordDto);
    return new ResponseDto(HttpStatus.OK, 'Processing forgot password');
  }

  @ApiOperation({ summary: 'Verify Forgot Password OTP' })
  @Post('verify-forgot-password-otp')
  async verifyForgotPasswordOtp(@Body() verifyForgotPasswordOtpDto: VerifyForgotPasswordOtpDto) {
    const resp = await this.authService.verifyForgotPasswordOtp(verifyForgotPasswordOtpDto);
    return new ResponseDto(HttpStatus.OK, 'Otp verified successfully.', resp).toJSON();
  }

  @ApiOperation({ summary: 'Change Password' })
  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    await this.authService.changePassword(changePasswordDto);
    return new ResponseDto(HttpStatus.OK, 'Password changed successfully!', {});
  }

  @ApiOperation({ summary: 'Sign Out' })
  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signout(@User() user: any) {
    await this.authService.signout(user);
    return new ResponseDto(HttpStatus.OK, 'User logged out.');
  }
}
