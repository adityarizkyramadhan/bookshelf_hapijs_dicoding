const { nanoid } = require('nanoid');
const books = require('../../domain/book');

const addBook = (req , res) => {
    const{
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = req.payload;
    if (!name){
        return res.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
    }
    if (readPage > pageCount){
        return res.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }
    const id = nanoid(12);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    books.push({
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished : readPage === pageCount,
        insertedAt,
        updatedAt,
    });
    const isSave = books.filter((book) => book.id === id).length > 0;
    if (!isSave){
        return res.response({
            status: 'error',
            message: 'Buku gagal ditambahkan',
        }).code(500);
    }
    return res.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    }).code(201);
}

const getBookById = (req , res) => {
    const { id } = req.params;
    const foundBook = books.filter((book) => book.id === id);
    if (foundBook.length === 0){
        return res.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404);
    }
    return res.response({
        status: 'success',
        data: { book: foundBook },
    });
}

const deleteBook = (req , res) => {
    const { id } = req.params;
    const book = books.filter((book) => book.id === id);
    if (book.length === 0){
        return res.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
            }).code(404);
    }
    books.splice(books.indexOf(book), 1);
    return res.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    });
}

const updateBook = (req , res) => {
    const { id } = req.params;
    const book = books.filter((book) => book.id === id);
    const index = books.indexOf(book);
    if (book.length === 0){
        return res.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
            }).code(404);
    }
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = req.payload;
    if (readPage > pageCount){
        return res.response({
            status: 'fail',
            message: 'Gagal mengubah buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }
    books[index] = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished : readPage === pageCount,
        insertedAt: book[0].insertedAt,
        updatedAt: new Date().toISOString(),
    };
    return res.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',

    });
}

const getBookByQuerry = (req , res) => {
    const { tittle, author, publisher, reading} = req.query;
    const book = books.filter((book) => {
        return book.tittle === tittle || book.year === year || book.author === author || book.publisher === publisher || book.pageCount === pageCount || book.readPage === readPage || book.reading === reading;
    });
    if (book.length === 0){
        return res.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404);
    }
    return res.response({
        status: 'success',
        data: { book },
    });
}

const getAllBooks = (req , res) => {
    bookResponse = books.map((book) => {
        return {
            id: book.id,
            tittle: book.tittle,
            publisher: book.publisher,
        }
    });
    return res.response({
        status: 'success',
        data: {
            books: bookResponse,
        },
    });
}

// const response = {
//     success: (res, data, message, status) => {
//         return res.response({
//             status: 'success',
//             message,
//             data,
//         }).code(status);
//     },
//     error: (res, error, message, status) => {
//         return res.response({
//             status: 'error',
//             message,
//             error,
//         }).code(status);
//     },
//     fail: (res, error, message, status) => {
//         return res.response({
//             status: 'fail',
//             message,
//             error,
//         }).code(status);
//     }
// }


module.exports = {getAllBooks, getBookByQuerry, getBookById, deleteBook, updateBook, addBook};