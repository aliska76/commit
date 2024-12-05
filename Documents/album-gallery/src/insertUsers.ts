import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { UserService } from './users/users.service'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const userService = app.get(UserService)

  console.log('Inserting users from file...')
  await userService.insertUsersFromFile()
  console.log('Users inserted successfully!')

  await app.close()
}

bootstrap()