import React, { useEffect, useState } from 'react'
import { getUsers, getAlbumsByUserId, getImagesByAlbumId } from './services/api'
import { Grid, Button, Typography, Card, CardContent, CardMedia } from '@mui/material'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './App.css'

const App: React.FC = () => {
  const [users, setUsers] = useState<any[]>([])
  const [albums, setAlbums] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [image, setImage] = useState<string>()

  const carouselSettings = {
    dots: true,
    speed: 0,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers()
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [])

  // Fetch albums when a user is selected
  const handleUserClick = async (userId: string) => {
    setLoading(true)
    setSelectedUserId(userId)
    setSelectedAlbumId(null) // Clear selected album when a new user is selected
    try {
      const response = await getAlbumsByUserId(userId)
      setAlbums(response.data)
    } catch (error) {
      console.error('Error fetching albums:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAlbumClick = async (albumId: string) => {
    setLoading(true)
    setSelectedAlbumId(albumId)
    setImages([]) // Clear images from the previous album

    try {
      const response = await getImagesByAlbumId(albumId) // Fetch images for the selected album
      const firstImageUrl = response.data[0]?.url // Get the first image URL
      const imageUrls = response.data.map((img: any) => img.url)

      if (firstImageUrl) {
        console.log('First image URL:', firstImageUrl) // Log the first image URL for debugging
        setImage(firstImageUrl)
        setImages(imageUrls)
      } else {
        console.error('No images found for the album!')
      }
      
      setImages(response.data.map((img: any) => img.url))
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (images.length > 0) {
      const imageLoadPromises = images.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = url
          img.onload = resolve
          img.onerror = reject
        })
      })
  
      Promise.all(imageLoadPromises)
        .catch((error) => console.error('Error loading images:', error))
    }
  }, [selectedAlbumId, images, image])
  

  return (
    <div className="App">
      <div className="Header">
      <Typography variant="h3" gutterBottom>
        Welcome to the Album Gallery
      </Typography>
      </div>

      <div className="user-cards-container">
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} key={user._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{user.name}</Typography>
                  <Button onClick={() => handleUserClick(user._id)} variant="contained">
                    View Albums
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <div className="albums-container">
        {selectedUserId && !loading && albums.length > 0 && (
          <>
            <Typography variant="h4" gutterBottom className="centered-header">
              Albums
            </Typography>
            <div className="albums-container1">
              {albums.map((album) => (
                <Card key={album._id} className="album-card" onClick={() => handleAlbumClick(album._id)}>
                  <CardMedia
                    component="img"
                    alt={album.title}
                    height="100"
                    image={image || `https://picsum.photos/200/200?random=${album._id}`}
                  />
                  <CardContent>
                    <Typography variant="h6">{album.title}</Typography>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Show carousel for selected album */}
            {images.length > 0 && (
              <div className="carousel-container">
                <Slider {...carouselSettings}>
                  {images.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={`Album Image ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                    </div>
                  ))}
                </Slider>
            </div>
            )}
          </>
        )}

        {loading && <Typography variant="h6">Loading...</Typography>}
      </div>
    </div>
  )
}

export default App