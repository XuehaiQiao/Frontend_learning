import { Book, FetchedData } from "../typs";

export async function fetchBooks(query: string, startIndex: number, maxResults: number): Promise<FetchedData> {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error.message || 'Failed to fetch books');
        }

        return {
            totalItems: data.totalItems,
            items: data.items.map((item: any) => ({
                id: item.id,
                previewLink: item.volumeInfo.previewLink,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || [],
            }))
        }
        
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};