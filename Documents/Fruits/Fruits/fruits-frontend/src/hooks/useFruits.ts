import { useState, useEffect } from 'react';
import type { Fruit } from '../types/fruit';
import { fetchFruitsApi } from  '../api/fruits-api.ts'

export function useFruits(search: string = '', page: number = 1, limit: number = 6) {
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true; // Защита от race conditions при быстром вводе

        const loadFruits = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const result = await fetchFruitsApi(search, page, limit);

                if (isMounted) {
                    setFruits(result.data);
                    setTotalPages(result.totalPages);
                }
            } catch (err: any) {
                if (isMounted) {
                    setError(err.message || 'Failed to fetch fruits');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadFruits();

        return () => {
            isMounted = false;
        };
    }, [search, page, limit]);

    return { fruits, page, totalPages, isLoading, error };
}