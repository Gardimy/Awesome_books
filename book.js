let books = JSON.parse(localStorage.getItem('books')) || [];
const bookListDiv = document.getElementById("book-list");
const addBookForm = document.getElementById("add-book-form");

function addBook(title, author) {
  books.push({ title: title, author: author });
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
    bookItem.innerHTML = `<span>${book.title} by ${book.author}</span>`;
    bookList.appendChild(bookItem);
  });

function displayBooks() {
  
  bookListDiv.innerHTML = "";
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const bookElement = document.createElement("p");
    bookElement.innerText = book.title + " by " + book.author;
    bookListDiv.appendChild(bookElement);
  }
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

const removeBookForm = document.getElementById('remove-book-form');
const removeTitleSelect = document.getElementById('remove-title');
books.forEach(book => {
  const titleOption = document.createElement('option');
  titleOption.value = '';
  titleOption.innerText = '';
 });

addBookForm.addEventListener("submit", function(event) {
  
  event.preventDefault();

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const title = titleInput.value;
  const author = authorInput.value;

  addBook(title, author);
  const bookElement = document.createElement("p");
  bookElement.innerText = title + " by " + author;
  const bookListDiv = document.getElementById("book-list");
  bookListDiv.appendChild(bookElement);
});

