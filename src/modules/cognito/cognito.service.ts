import { AdminSetUserPasswordCommand, AuthFlowType, CognitoIdentityProviderClient, ConfirmForgotPasswordCommand, ConfirmSignUpCommand, ForgotPasswordCommand, GlobalSignOutCommand, InitiateAuthCommand, ResendConfirmationCodeCommand, SignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';
import { fromEnv } from '@aws-sdk/credential-providers';
import { LoginDto, ConfirmSignupCodeDto, ForgotPasswordDto, ChangePasswordDto } from '../auth/dto';
import { generateRandomPassword } from 'src/shared/utils';
import { CognitoSignupDto } from './dto/cognito.dto';

@Injectable()
export class CognitoService {
  private readonly client: CognitoIdentityProviderClient;
  private readonly clientId: string;

  constructor() {
    this.client = new CognitoIdentityProviderClient({ credentials: fromEnv() });
    this.clientId = process.env.AWS_COGNITO_CLIENT_ID as string;
  }

  async resendCode(email: string): Promise<any> {
    const command = new ResendConfirmationCodeCommand({
      Username: email,
      ClientId: this.clientId,
    });

    return this.client.send(command);
  }

  async signup(cognitoSignupDto: CognitoSignupDto): Promise<any> {
    const command = new SignUpCommand({
      ClientId: this.clientId,
      Username: cognitoSignupDto.email,
      Password: cognitoSignupDto.password,
      UserAttributes: [{ Name: 'email', Value: cognitoSignupDto.email }],
    });

    return this.client.send(command);
  }

  async login(loginDto: LoginDto): Promise<any> {
    const command = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: loginDto.email,
        PASSWORD: loginDto.password,
      },
      ClientId: this.clientId,
    });

    return this.client.send(command);
  }

  async signout(accessToken: string): Promise<any> {
    const command = new GlobalSignOutCommand({
      AccessToken: accessToken,
    });

    return this.client.send(command);
  }

  async confirmSignupCode(confirmSignupCodeDto: ConfirmSignupCodeDto): Promise<any> {
    const command = new ConfirmSignUpCommand({
      ClientId: this.clientId,
      Username: confirmSignupCodeDto.email,
      ConfirmationCode: confirmSignupCodeDto.code,
    });

    return this.client.send(command);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<any> {
    const command = new ForgotPasswordCommand({
      ClientId: this.clientId,
      Username: forgotPasswordDto.username,
    });

    return this.client.send(command);
  }

  async verifyForgotPasswordOtp(Username: string, ConfirmationCode: string): Promise<any> {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: this.clientId,
      Username,
      ConfirmationCode,
      Password: generateRandomPassword(),
    });

    return this.client.send(command);
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<any> {
    const command = new AdminSetUserPasswordCommand({
      Password: changePasswordDto.password,
      Username: changePasswordDto.username,
      Permanent: true,
      UserPoolId: process.env.AWS_USER_POOL_ID as string,
    });

    return this.client.send(command);
  }
}
