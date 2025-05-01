import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { EmailService } from 'src/email/email.service';
import { EmailDto } from 'src/email/dto/email.dto';

@Controller('email')
@UseGuards(ThrottlerGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() emailDto: EmailDto) {
    await this.emailService.sendEmail(emailDto);
    return {
      success: true,
      message: 'Email sent successfully',
      timestamp: new Date().toISOString(),
    };
  }
}
