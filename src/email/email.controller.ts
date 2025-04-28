import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailDto } from './dto/email.dto';

@Controller('email')
export class EmailController {
    constructor(private readonly emailService: EmailService) { }

    @Post()
    async sendEmail(@Body() emailDto: EmailDto) {
        await this.emailService.sendEmail(emailDto);
        return { message: 'Email sent successfully' };
    }
} 