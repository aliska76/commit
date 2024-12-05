import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import { getUsers, getAlbumsByUserId, getImagesByAlbumId } from './services/api'

jest.mock('./services/api') // Mock API calls

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the header', () => {
    render(<App />)
    expect(screen.getByText(/Welcome to the Album Gallery/i)).toBeInTheDocument()
  })

  test('fetches and displays users', async () => {
    (getUsers as jest.Mock).mockResolvedValueOnce({
      data: [
        { _id: '1', name: 'User 1' },
        { _id: '2', name: 'User 2' }
      ]
    })

    render(<App />)

    await waitFor(() => expect(screen.getByText('User 1')).toBeInTheDocument())
    expect(screen.getByText('User 2')).toBeInTheDocument()
  })

  test('fetches and displays albums for a selected user', async () => {
    (getUsers as jest.Mock).mockResolvedValueOnce({
      data: [{ _id: '1', name: 'User 1' }],
    })

    (getAlbumsByUserId as jest.Mock).mockResolvedValueOnce({
      data: [
        { _id: '101', title: 'Album 1' },
        { _id: '102', title: 'Album 2' }
      ]
    })

    render(<App />)

    await waitFor(() => expect(screen.getByText('User 1')).toBeInTheDocument())

    fireEvent.click(screen.getByText('View Albums'))

    await waitFor(() => expect(screen.getByText('Album 1')).toBeInTheDocument())
    expect(screen.getByText('Album 2')).toBeInTheDocument()
  })

  test('fetches and displays images for a selected album', async () => {
    (getUsers as jest.Mock).mockResolvedValueOnce({
      data: [{ _id: '1', name: 'User 1' }],
    })

    (getAlbumsByUserId as jest.Mock).mockResolvedValueOnce({
      data: [{ _id: '101', title: 'Album 1' }],
    })

    (getImagesByAlbumId as jest.Mock).mockResolvedValueOnce({
      data: [
        { url: 'https://example.com/image1.jpg' },
        { url: 'https://example.com/image2.jpg' }
      ]
    })

    render(<App />)

    await waitFor(() => expect(screen.getByText('User 1')).toBeInTheDocument())
    fireEvent.click(screen.getByText('View Albums'))

    await waitFor(() => expect(screen.getByText('Album 1')).toBeInTheDocument())
    fireEvent.click(screen.getByText('Album 1'))

    await waitFor(() => expect(screen.getByAltText('Album Image 1')).toBeInTheDocument())
    expect(screen.getByAltText('Album Image 2')).toBeInTheDocument()
  })

  test('shows loading message when fetching data', async () => {
    (getUsers as jest.Mock).mockReturnValue(
      new Promise(() => {
        // Simulate a long fetch
      })
    )

    render(<App />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('handles empty album and image lists gracefully', async () => {
    (getUsers as jest.Mock).mockResolvedValueOnce({
      data: [{ _id: '1', name: 'User 1' }]
    })

    (getAlbumsByUserId as jest.Mock).mockResolvedValueOnce({
      data: []
    })

    (getImagesByAlbumId as jest.Mock).mockResolvedValueOnce({
      data: []
    })

    render(<App />)

    await waitFor(() => expect(screen.getByText('User 1')).toBeInTheDocument())
    fireEvent.click(screen.getByText('View Albums'))

    await waitFor(() => expect(screen.queryByText('Album 1')).not.toBeInTheDocument())
  })
})
