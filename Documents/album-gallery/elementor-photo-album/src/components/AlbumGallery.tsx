import React, { useEffect, useState } from 'react'
import { getAlbumsByUserId } from '../services/api'
import { Grid, Card, CardMedia, Typography } from '@mui/material'

interface AlbumGalleryProps {
  userId: string
}

const AlbumGallery: React.FC<AlbumGalleryProps> = ({ userId }) => {
  const [albums, setAlbums] = useState<any[]>([])

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await getAlbumsByUserId(userId)
        setAlbums(response.data)
      } catch (error) {
        console.error('Error fetching albums:', error)
      }
    }
    fetchAlbums()
  }, [userId])

  return (
    <Grid container spacing={2}>
      {albums.map((album) => (
        <Grid item xs={12} sm={6} md={4} key={album.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={album.coverImage} // Assuming `coverImage` is the first image
              alt={album.title}
            />
            <Typography variant="h6">{album.title}</Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default AlbumGallery