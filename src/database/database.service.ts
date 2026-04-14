import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}
  private isConnected = false;
  onModuleInit() {
    this.isConnected = true;
    console.log('Database connected');
    console.log(this.configService.get('MONGO_URI'));
  }
  onApplicationShutdown(signal: string) {
    this.isConnected = false;
    console.log('Disconnected due to shutdown. Signal:', signal);
  }
  getStatus() {
    return this.isConnected ? 'Connected' : 'Disconnected';
  }
}
