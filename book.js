let books = JSON.parse(localStorage.getItem('books')) || [];

function addBook(title, author) {
  books.push({title, author, id: Date.now()});
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBook(title) {
  books = books.filter(book => book.title !== title);
  localStorage.setItem('books', JSON.stringify(books));
}

function displayBooks() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  books.forEach(book => {
    const bookItem = document.createElement('div');
    bookItem.classList.add('book');
    bookItem.innerHTML = `${book.title} by ${book.author}<button id="remove-title" data-index="${book}">Remove</button>`;
    bookList.appendChild(bookItem);
  });
}

displayBooks();

const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', event => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  addBook(title, author);
  displayBooks();
  addBookForm.reset();
});

const removeButton = document.getElementById("remove-button");
removeButton.addEventListener("click", () => {
  const removeTitle = document.getElementById('remove-title').value;
  removeBook(removeTitle);
  document.getElementById("removeTitle").value = "";
});