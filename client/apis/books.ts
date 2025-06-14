import request from 'superagent'
import { Book, BookData } from '../../models/books'

const rootURL = new URL('/api/v1', document.baseURI)

// Get Books
export async function fetchBooks(): Promise<Book[]> {
  const result = await request.get(`${rootURL}/books`)
  return result.body.books
}

//  post Add  book
export async function addBook(newBook: BookData): Promise<Book> {
  const result = await request
    .post(`${rootURL}/books`)
    .send({ book: newBook })

  return result.body.book
}

// Delete Data
export async function deleteBook(id: number): Promise<void> {
  await request.del(`${rootURL}/books/${id}`)
}

// Update Data
export async function updateBook(
  id: number,
  updatedBook: { title: string; author: string }
): Promise<Book> {
  const result = await request
    .patch(`${rootURL}/books/${id}`)
    .send({ book: updatedBook }) 


  return result.body.book
}