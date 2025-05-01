import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from 'src/email/email.controller';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [ConfigModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
