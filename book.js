class Books {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
  }

  addBook(title, author) {
    const book = { title, author, id: Date.now() };
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  removeBook(id) {
    const index = this.books.findIndex((book) => book.id === Number(id));
    if (index !== -1) {
      this.books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(this.books));
    }
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

  getBooks() {
    return this.books;
  }
}

const books = new Books();
books.displayBooks();

const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  books.addBook(title, author);
  books.displayBooks();
  addBookForm.reset();
});

const bookList = document.getElementById('book-list');
bookList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-title')) {
    const { id } = event.target.dataset;
    books.removeBook(id);
    books.displayBooks();
  }
});

document.querySelector('#list').addEventListener('click', () => {
  document.querySelector('.list_container').classList.add('dBlock');
  document.querySelector('.list_container').classList.remove('dNone');
  document.querySelector('.contact_section').classList.add('dNone');
  document.querySelector('.contact_section').classList.remove('dBlock');
  document.querySelector('.form_section').classList.add('dNone');
  document.querySelector('.form_section').classList.remove('dBlock');
});

document.querySelector('#addBook').addEventListener('click', () => {
  document.querySelector('.list_container').classList.add('dNone');
  document.querySelector('.list_container').classList.remove('dBlock');
  document.querySelector('.form_section').classList.add('dBlock');
  document.querySelector('.form_section').classList.remove('dNone');
  document.querySelector('.contact_section').classList.add('dNone');
  document.querySelector('.contact_section').classList.remove('dBlock');
});

document.querySelector('#contact').addEventListener('click', () => {
  document.querySelector('.contact_section').classList.add('dBlock');
  document.querySelector('.contact_section').classList.remove('dNone');
  document.querySelector('.form_section').classList.add('dNone');
  document.querySelector('.form_section').classList.remove('dBlock');
  document.querySelector('.list_container').classList.add('dNone');
  document.querySelector('.list_container').classList.remove('Block');
});
