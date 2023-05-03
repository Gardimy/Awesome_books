class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Date.now();
  }

  static getAllBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
  }

  static addBook(title, author) {
    const book = new Book(title, author);
    const books = Book.getAllBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id) {
    const books = Book.getAllBooks();
    const index = books.findIndex((book) => book.id === Number(id));
    if (index !== -1) {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

  displayBooks() {
    const books = Book.getAllBooks();
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    books.forEach((book) => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('book');
      bookItem.innerHTML = `${book.title} by ${book.author}<button class="remove-title" data-id="${book.id}">Remove</button>`;
      bookList.appendChild(bookItem);

      const removeButton = bookItem.querySelector('.remove-title');
      removeButton.addEventListener('click', (event) => {
        const { id } = event.target.dataset;
        Book.removeBook(id);
        this.displayBooks();
      });
    });
  }
}

const book = new Book();
book.displayBooks();

const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  Book.addBook(title, author);
  book.displayBooks();
  addBookForm.reset();
});

const bookList = document.getElementById('book-list');
bookList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-title')) {
    const { id } = event.target.dataset;
    Book.removeBook(id);
    book.displayBooks();
  }
});