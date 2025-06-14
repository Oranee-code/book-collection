import { Book, BookData } from '../../models/books.ts'
import connection from './connection.ts'

export async function getBook(db = connection): Promise<Book[]> {
  return db('books').select()
  // .orderBy('id')
}

export async function addBook(
  book: BookData,
  db = connection,
): Promise<Book> {
  return db('books')
    .insert(book)
    .returning('*')
    .then((insertedEntries) => insertedEntries[0])
}

export async function updateBook(
  id: number,
  updatedBook: BookData,
  db = connection,
): Promise<Book> {
  return db('books')
    .where({ id })
    .update(updatedBook)
    .returning('*')
    .then((updatedEntries) => updatedEntries[0])
}

export async function deleteBook(id: number, db = connection) {
  return db('books').where({ id }).delete()
}