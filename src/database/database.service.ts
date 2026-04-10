import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private isConnected = false;
  onModuleInit() {
    this.isConnected = true;
    console.log('Database connected');
  }
  onApplicationShutdown(signal: string) {
    this.isConnected = false;
    console.log('Disconnected due to shutdown. Signal:', signal);
  }
  getStatus() {
    return this.isConnected ? 'Connected' : 'Disconnected';
  }
}
