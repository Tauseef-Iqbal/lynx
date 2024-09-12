import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import ApiError from 'src/shared/utils/api.error';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from '../../typeorm/models/user.entity';
import { CognitoService } from '../cognito/cognito.service';
import { UserService } from '../user/user.service';
import { ChangePasswordDto, ConfirmSignupCodeDto, ForgotPasswordDto, LoginDto, ResendCodeDto, SaveRepresentationDto, SignupDto, VerifyForgotPasswordOtpDto } from './dto';
import { IAuthService } from './interfaces/auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly cognitoService: CognitoService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getAuthToken(user: UserEntity, sub: string, AccessToken?: string): Promise<string> {
    const token = this.jwtService.sign({ id: user.id, sub });
    await this.cacheManager.set(
      `user-${user.id}`,
      JSON.stringify({
        sub,
        AccessToken,
        id: user.id,
        email: user.email,
        company: { id: user?.company?.id },
        companyProfile: { id: user?.companyProfile?.id, name: user?.companyProfile?.name },
      }),
    );
    return token;
  }

  async saveRepresentation(saveRepresentationDto: SaveRepresentationDto, userId: number) {
    const response = await this.userService.saveRepresentation(userId, saveRepresentationDto.representation);
    return response;
  }

  async signup(signupDto: SignupDto) {
    const userExists = await this.userService.findUserByEmail(signupDto.email);
    if (userExists) {
      if (userExists.emailVerified) throw new ApiError(500, 'This account has already been registered for LYNX.');

      await this.cognitoService.resendCode(userExists.email);

      const user = await this.userService.findByEmail(signupDto.email);

      return {
        data: user,
        message: 'A code has been resent to your registered email.',
        success: true,
        userExists: true,
      };
    }

    const { email, password } = signupDto;
    await this.cognitoService.signup({ email, password, username: email });

    const createdUser = await this.userService.createUser(signupDto);
    return {
      data: createdUser,
      success: true,
      message: 'A code has been sent to your email.',
    };
  }

  async resendCode(resendCodeDto: ResendCodeDto) {
    const response = await this.cognitoService.resendCode(resendCodeDto.email);
    return response;
  }

  async login(loginDto: LoginDto) {
    const {
      AuthenticationResult: { AccessToken },
    } = await this.cognitoService.login(loginDto);

    const { sub } = this.jwtService.decode(AccessToken) as { sub: string };

    const user = await this.userService.findUserByEmail(loginDto.email);

    if (!user) throw new NotFoundException('User not found');

    const token = await this.getAuthToken(user, sub, AccessToken);
    return { token, user };
  }

  async confirmSignupCode(confirmSignupCodeDto: ConfirmSignupCodeDto) {
    const response = await this.cognitoService.confirmSignupCode(confirmSignupCodeDto);
    const user = await this.userService.setEmailVerified({
      email: confirmSignupCodeDto.email,
    });
    const sub = uuidv4();

    const token = await this.getAuthToken(user, sub);

    return { token, user, response };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return await this.cognitoService.forgotPassword(forgotPasswordDto);
  }

  async verifyForgotPasswordOtp(verifyForgotPasswordOtpDto: VerifyForgotPasswordOtpDto) {
    const { username, otp } = verifyForgotPasswordOtpDto;
    await this.cognitoService.verifyForgotPasswordOtp(username, otp);
    const uuid = uuidv4();
    await this.userService.saveForgotPasswordUuid(username, uuid);
    return { uuid };
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.userService.findByEmail(changePasswordDto.username);
    if (user?.forgotPasswordUuid !== changePasswordDto.uuid) throw new ApiError(500, 'Invalid code supplied. Please try again later.');
    const response = await this.cognitoService.changePassword(changePasswordDto);
    return response;
  }

  async signout(user: any) {
    const { AccessToken, id } = user;
    if (id) await this.cacheManager.del(`user-${id}`);
    if (AccessToken) await this.cognitoService.signout(AccessToken);
    return true;
  }
}
