let books = JSON.parse(localStorage.getItem('books')) || [];
const bookListDiv = document.getElementById("book-list");
const addBookForm = document.getElementById("add-book-form");

// Define the functions to add and remove books
function addBook(title, author) {
  books.push({ title: title, author: author });
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBook(title) {
  books = books.filter(book => book.title !== title);
  localStorage.setItem('books', JSON.stringify(books));
}

// Define function to display book list on the top of the page

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

//Create event listener when user Add book

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
