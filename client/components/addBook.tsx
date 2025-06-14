import { useState } from 'react'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { addBook } from '../apis/books'

function AddBookForm() {
  const queryClient: QueryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const mutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']) 
      setTitle('')
      setAuthor('')
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !author.trim()) return
    mutation.mutate({ title, author })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Book</h2>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="author">Author</label>
      <input
        id="author"
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

<button className="btn-add" type="submit">
        Add Book
      </button>
    </form>
  )
}
export default AddBookForm