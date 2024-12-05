import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  getHealthStatus(): string {
    return 'Application is running'
  }

  getAppInfo(): { name: string, version: string } {
    return { name: 'Album Gallery', version: '1.0.0' }
  }
}