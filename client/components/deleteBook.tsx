import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Book } from '../../models/books'
import { deleteBook } from '../apis/books'

interface Props {
  book: Book
}

export default function DeleteButton({ book }: Props) {
  const queryClient = useQueryClient()

  const deleteBookMutation = useMutation({
    mutationFn: (id: number) => deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })

  const handleDelete = async (id: number) => {
    console.log('deleting', id)
    deleteBookMutation.mutate(id)
  }

  return (
    <button className="btn-delete" onClick={() => handleDelete(book.id)}>
      Delete
    </button>
  )
}