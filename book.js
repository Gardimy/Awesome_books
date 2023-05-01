let books = JSON.parse(localStorage.getItem('books')) || [];

// Define the functions to add and remove books
function addBook(title, author) {
  books.push({ title: title, author: author });
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBook(title) {
  books = books.filter(book => book.title !== title);
  localStorage.setItem('books', JSON.stringify(books));
}