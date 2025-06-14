import { useQuery } from '@tanstack/react-query'
import { fetchBooks } from '../apis/books'
import { Book } from '../../models/books' 
import AddBook from './addBook'
import DeleteButton from './deleteBook'
import UpdateBookForm from './updateBook'

function Home() {
  const { data, error, isLoading 
  } = useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: fetchBooks,
  })

  if (isLoading) return <p>Loading books...</p>
  if (error instanceof Error) return <p>Error: {error.message}</p>

  if (!data) return <p>No books found</p>

  const books = data

  return (
    <div>
      <h2>Home</h2>
      <h2>Books List</h2>
      <ul>
  {books.map((book) => (
    <li key={book.id}>
      <article>
        <h2>{book.title}</h2>
        <p>by {book.author}</p>
        <DeleteButton book={book} />
        <UpdateBookForm book={book} />
      </article>
    </li>
  ))}
</ul>
      <AddBook />
    </div>
  )
}
export default Home