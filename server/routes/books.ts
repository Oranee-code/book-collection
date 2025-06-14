import express from 'express'

import * as db from '../db/books.ts'
import { BookData } from '../../models/books.ts'

const router = express.Router()

// A public endpoint that anyone can access
// GET /api/v1/books
router.get('/', async (req, res) => {
  try {
    const books = await db.getBook()
    res.json({ books })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// TODO: use checkJwt as middleware
// POST /api/v1/books
router.post('/', async (req, res) => {
  const { book } = req.body as { book: BookData }

  if (!book) {
    console.error('No books provided')
    return res.status(400).send('Bad request')
  }

  try {
    const newBook = await db.addBook(book)

    res.status(201).json({ book: newBook })
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// TODO: use checkJwt as middleware
// PUT /api/v1/books/:id
router.put('/:id', async (req, res) => {
  const { book } = req.body as { book: BookData }

  const id = Number(req.params.id)

  if (!book || !id) {
    console.error('Bad Request - no book or id')
    return res.status(400).send('Bad request')
  }

  try {
    const updatedBook = await db.updateBook(id, book)

    res.status(200).json({ appliance: updatedBook })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      if (error instanceof Error) {
        return res.status(500).send(error.message)
      }
      res.status(500).send('Something went wrong')
    }
  }
})

// TODO: use checkJwt as middleware
// DELETE /api/v1/appliances
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)

  if (!id) {
    console.error('Invalid book id')
    return res.status(400).send('Bad request')
  }

  try {
    await db.deleteBook(id)

    res.sendStatus(200)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      return res.status(500).send(error.message)
    }
    res.status(500).send('Something went wrong')
  }
})
// PATCH  Update Data /api/v1/books/:id
router.patch('/:id', async (req, res) => {
  const { book } = req.body as { book: BookData }
  const id = Number(req.params.id)

  if (!book || !id) {
    console.error('Bad Request - no book or id')
    return res.status(400).send('Bad request')
  }

  try {
    const updatedBook = await db.updateBook(id, book)
    res.status(200).json({ book: updatedBook }) 
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

export default router