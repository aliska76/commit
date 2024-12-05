import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000', // backend URL
  headers: {
    'Content-Type': 'application/json',
  }
})

export const getUsers = () => api.get('/users')
export const insertUsersFromFile = () => api.get('/users')
export const getAlbumsByUserId = (userId: string) => api.get(`/albums/user/${userId}`)
export const getAlbumImages = (albumId: string) => api.get(`/albums/${albumId}/images`)
export const getAllImages = () => api.get('/images')
export const getImagesByAlbumId = (albumId: string) => api.get(`/images/album/${albumId}`)
export const createAlbum = (albumData: any) => api.post('/albums', albumData)
export const updateAlbum = (albumId: string, albumData: any) => api.put(`/albums/${albumId}`, albumData)
export const deleteAlbum = (albumId: string) => api.delete(`/albums/${albumId}`)