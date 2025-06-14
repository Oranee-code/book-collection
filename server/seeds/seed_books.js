/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('books').del()
  await knex('books').insert([
    { title: 'Ready Player One', author: 'Ernest Cline' },
    { title: 'Throwing Rocks at the Google Bus', author: 'Douglas Rushkoff' },
    { title: 'The Hobbit', author: 'J.R.R. Tolkien' },
  ])
}
