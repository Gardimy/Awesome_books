let books = JSON.parse(localStorage.getItem('books')) || [];

function addBook(title, author) {
  const id = Date.now();
  books.push({ title, author, id });
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBook(id) {
  books = books.filter((book) => book.id !== id);
  localStorage.setItem('books', JSON.stringify(books));
}

function displayBooks() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  books.forEach((book) => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book');
    bookItem.innerHTML = `${book.title} by ${book.author}<button class="remove-title" data-id="${book.id}">Remove</button>`;
    bookList.appendChild(bookItem);
  });
}

displayBooks();

const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  addBook(title, author);
  displayBooks();
  addBookForm.reset();
});

const removeBtns = document.querySelectorAll('.remove-title');
removeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const { id } = btn.dataset;
    removeBook(id);
    displayBooks();
  });
});