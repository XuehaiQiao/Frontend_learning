import { useState } from 'react';
import { fetchBooks } from '../API/api';
import { Book, PaginationProps } from "../typs";
import { addBook } from '../redux/wishlistReducer';
import { useDispatch } from 'react-redux';
import Pagination from './Pagination';

function SearchPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [error, setError] = useState<string>('');

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const dispatch = useDispatch();
    const containerStyle: React.CSSProperties = {
        backgroundColor: '#f0f0f0',
        padding: '5px',
        margin: '10px',
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(query);
    };

    const handleAddToWishlist = (book: Book) => {
        dispatch(addBook(book));
    };

    const onSubmit = (q: string) => {
        setLoading(true);

        setTimeout(() => {
            // Call the fetchBooks function from your API file with the query
            fetchBooks(q, (currentPage - 1) * itemsPerPage, itemsPerPage)
                .then((data) => {
                    setTotalPages(Math.ceil(data.totalItems / itemsPerPage));
                    setBooks(data.items)
                })
                .catch((error) => setError(error.message))
                .finally(() => setLoading(false));
        }, 1000);
    }

    const handlePageChange = (pageNumber: number) => {
        if(pageNumber < 1) pageNumber = 1;
        if(pageNumber > totalPages) pageNumber = totalPages;
        setCurrentPage(pageNumber);
        onSubmit(query);
    };

    // Render the books in your component
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search books..."
                />
                <button type="submit">Search</button>
            </form>

            <h2>Book List</h2>
            {loading ? <p>Loading...</p> : error ?
                <p>Error: {error}</p> : books.map((book) => (
                    <div key={book.id} style={containerStyle}>
                        <h4>{book.title}</h4>
                        <p>Authors: {book.authors.join(', ')}</p>
                        <button onClick={() => handleAddToWishlist(book)} >Add</button>
                    </div>
                ))}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default SearchPage;