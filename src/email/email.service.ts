import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { EmailDto } from './dto/email.dto';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_APP_PASSWORD'),
            },
        });
    }

    async sendEmail(data: EmailDto): Promise<void> {
        const mailOptions = {
            from: this.configService.get('EMAIL_USER'),
            to: this.configService.get('EMAIL_RECIPIENT'),
            subject: 'New Contact Form Submission',
            text: `
        Name: ${data.name}
        Email: ${data.email}
        Mobile: ${data.mobile}
        Additional Info: ${data.additional || 'None'}
      `,
        };

        await this.transporter.sendMail(mailOptions);
    }
} 