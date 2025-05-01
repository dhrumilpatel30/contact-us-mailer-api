import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailDto } from './dto/email.dto';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private initializeTransporter(): void {
    try {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: this.configService.getOrThrow<string>('EMAIL_USER'),
          pass: this.configService.getOrThrow<string>('EMAIL_APP_PASSWORD'),
        },
        tls: {
          rejectUnauthorized: true,
        },
      });
    } catch (error) {
      this.logger.error('Failed to initialize email transporter', error);
      throw new InternalServerErrorException(
        'Email service configuration failed',
      );
    }
  }

  private createEmailTemplate(data: EmailDto): string {
    return `
      <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; }
            .field { margin-bottom: 10px; }
            .label { font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
              <div class="field">
                <span class="label">Name:</span> ${data.name}
              </div>
              <div class="field">
                <span class="label">Email:</span> ${data.email}
              </div>
              <div class="field">
                <span class="label">Mobile:</span> ${data.mobile}
              </div>
              <div class="field">
                <span class="label">Additional Info:</span> ${data.additional || 'None'}
            </div>
          </div>
        </body>
      </html>
    `;
  }

  async sendEmail(data: EmailDto): Promise<void> {
    try {
      const mailOptions: Mail.Options = {
        from: {
          name: 'Contact Form',
          address: this.configService.getOrThrow<string>('EMAIL_USER'),
        },
        to: data.senderEmail,
        subject: 'New Contact Form Submission',
        text: `
          Name: ${data.name}
          Email: ${data.email}
          Mobile: ${data.mobile}
          Additional Info: ${data.additional || 'None'}
        `,
        html: this.createEmailTemplate(data),
      };

      await this.transporter.verify();
      await this.transporter.sendMail(mailOptions);
      // console.log(mailOptions);

      this.logger.log(`Email sent successfully to ${data.senderEmail}`);
    } catch (error) {
      this.logger.error('Failed to send email', error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
