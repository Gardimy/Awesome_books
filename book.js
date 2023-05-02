const books = JSON.parse(localStorage.getItem('books')) || [];

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class Library {
  constructor() {
    this.books = books.map((book) => new Book(book.title, book.author, book.id));
  }

  addBook(title, author) {
    const id = Date.now();
    const book = new Book(title, author, id);
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  removeBook(id) {
    const index = this.books.findIndex((book) => book.id === Number(id));
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  displayBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    this.books.forEach((book) => {
      const bookItem = document.createElement('div');
      bookItem.classList.add('book');
      bookItem.innerHTML = `${book.title} by ${book.author}<button class="remove-title" data-id="${book.id}">Remove</button>`;
      bookList.appendChild(bookItem);

      const removeButton = bookItem.querySelector('.remove-title');
      removeButton.addEventListener('click', (event) => {
        const { id } = event.target.dataset;
        this.removeBook(id);
        this.displayBooks();
      });
    });
  }
}

const library = new Library();

library.displayBooks();

const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  library.addBook(title, author);
  library.displayBooks();
  addBookForm.reset();
});

const removeButtons = document.querySelectorAll('.remove-title');
removeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const { id } = event.target.dataset;
    library.removeBook(id);
    library.displayBooks();
  });
});