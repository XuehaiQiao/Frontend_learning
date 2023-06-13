import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Book } from '../typs';
import { RootState } from '../redux/store';
import { removeBook } from '../redux/wishlistReducer';
import { Link } from 'react-router-dom';

const Wishlist: React.FC = () => {
    const wishlist = useSelector((state: RootState) => state.wishlist);

    const dispatch = useDispatch();
    const containerStyle: React.CSSProperties = {
        backgroundColor: '#f0f0f0',
        padding: '5px',
        margin: '10px',
    };

    const handleRemoveBook = (bookId: string) => {
        dispatch(removeBook(bookId));
    };

    return (
        <div>
            <h2>Wishlist</h2>
            {wishlist.length > 0 ? (
                <div>
                    {wishlist.map((book: Book) => (
                        <div key={book.id} style={containerStyle}>
                            <h4><Link to={book.previewLink}>{book.title}</Link></h4>
                            <p>Authors: {book.authors.join(', ')}</p>
                            <button onClick={() => handleRemoveBook(book.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your wishlist is empty.</p>
            )}
        </div>
    );
};

export default Wishlist;
