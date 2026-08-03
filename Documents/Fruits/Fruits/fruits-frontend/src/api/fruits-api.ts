import type { Fruit } from '../types/fruit';

const API_BASE_URL = 'http://localhost:3000';

export interface PaginatedFruitsResponse {
    data: Fruit[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

/**
 * Fetches fruits from NestJS backend with search and pagination support.
 */
export const fetchFruitsApi = async (
    searchQuery: string = '',
    page: number = 1,
    limit: number = 6
): Promise<PaginatedFruitsResponse> => {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });

    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
        params.append('search', trimmedQuery);
    }

    const response = await fetch(`${API_BASE_URL}/api/fruits?${params.toString()}`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Verify that the response content type is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON response, but received ${contentType || 'text/html'}`);
    }

    return response.json();
};