import { Book } from "../typs";

export async function fetchBooks(query: string): Promise<Book[]> {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=20`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error.message || 'Failed to fetch books');
        }

        return data.items.map((item: any) => ({
            id: item.id,
            previewLink: item.volumeInfo.previewLink,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || [],
        }));
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};