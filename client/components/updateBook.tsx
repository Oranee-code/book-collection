import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBook } from '../apis/books'
import { Book } from '../../models/books'
import '../styles/index.css'

interface Props {
  book: Book
}

 function UpdateBookForm({ book }: Props) {
  const [title, setTitle] = useState(book.title)
  const [author, setAuthor] = useState(book.author)
  const [isEditing, setIsEditing] = useState(false)

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (updatedBook: { title: string; author: string }) =>
      updateBook(book.id, updatedBook),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      setIsEditing(false)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ title, author })
  }

  return isEditing ? (
    <form onSubmit={handleSubmit}>
  <label htmlFor={`title-${book.id}`}>Title:</label>
  <input
    id={`title-${book.id}`}
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <label htmlFor={`author-${book.id}`}>Author:</label>
  <input
    id={`author-${book.id}`}
    value={author}
    onChange={(e) => setAuthor(e.target.value)}
  />

<button className="btn-save" type="submit">Save</button>
<button className="btn-cancel" type="button"  onClick={() => setIsEditing(false)}>Cancel</button>
</form>
  ) : (
    <button className="btn-edit" onClick={() => setIsEditing(true)}>
      Edit
    </button>
  )
}
export default UpdateBookForm


