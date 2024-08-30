import { Injectable, Logger } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';
import { ContactUsDto } from 'src/modules/contact-us/dto';

@Injectable()
export class SESService {
  private readonly logger = new Logger(SESService.name);
  private readonly sesClient: SESClient;

  constructor(private readonly configService: ConfigService) {
    this.sesClient = new SESClient({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async sendEmail(emailData: ContactUsDto): Promise<void> {
    const body = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Contact Us Submission</h2>
        <p><strong>First Name:</strong> ${emailData.firstName}</p>
        <p><strong>Last Name:</strong> ${emailData.lastName}</p>
        <p><strong>Email:</strong> ${emailData.email}</p>
        <p><strong>Phone Number:</strong> ${emailData.phoneNumber}</p>
        <p><strong>Message:</strong></p>
        <p>${emailData.message}</p>
      </div>
    `;
    const command = new SendEmailCommand({
      Source: this.configService.get<string>('SES_SOURCE_EMAIL'),
      Destination: {
        ToAddresses: [this.configService.get<string>('SES_SOURCE_EMAIL')],
      },
      Message: {
        Subject: {
          Data: 'Support Request Submitted via Contact Us Page',
        },
        Body: {
          Html: {
            Data: body,
          },
        },
      },
    });

    try {
      await this.sesClient.send(command);
      this.logger.log('Email sent successfully');
    } catch (error) {
      this.logger.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
