const books = JSON.parse(localStorage.getItem('books')) || [];

function addBook(title, author) {
  const id = Date.now();
  books.push({ title, author, id });
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

    /*Add event listener to enable remove button after click it once*/
    const removeButton = bookItem.querySelector('.remove-title');
    removeButton.addEventListener('click', (event) => {
      const { id } = event.target.dataset;
      removeBook(id);
      displayBooks();
    });
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

/* Add function to remove book from books*/
function removeBook(id) {
  const index = books.findIndex((book) => book.id === Number(id));
  books.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(books));
}

const removeButtons = document.querySelectorAll('.remove-title');
removeButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const { id } = event.target.dataset;
    removeBook(id);
    displayBooks();
  });
});