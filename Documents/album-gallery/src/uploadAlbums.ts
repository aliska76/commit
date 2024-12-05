import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AlbumService } from './albums/albums.service'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const albumsService = app.get(AlbumService)

  console.log('Inserting albums from file...')
  await albumsService.uploadAlbums()
  console.log('Albums uploaded successfully!')

  await app.close()
}

bootstrap()