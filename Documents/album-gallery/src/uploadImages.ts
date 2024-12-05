import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ImageService } from './images/images.service'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const imagesService = app.get(ImageService)

  console.log('Inserting images from file...')
  await imagesService.uploadImages()
  console.log('Images uploaded successfully!')

  await app.close()
}

bootstrap()