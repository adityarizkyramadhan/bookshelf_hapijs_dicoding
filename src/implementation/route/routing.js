const {getAllBooks, getBookByQuerry, getBookById, deleteBook, updateBook, addBook
}= require('../handler/handlerbook');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookById,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBook,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBook,
    },
    {
        method: 'GET',
        path: '/books/search',
        handler: getBookByQuerry,
    },
];
module.exports = routes;
