let books = JSON.parse(localStorage.getItem('books')) || [];

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
      const removeTitle = document.getElementById('remove-title');
      books.forEach(book => {
        const titleOption = document.createElement('option');
        titleOption.value = book.title;
        titleOption.innerText = book.title;
        removeTitle.appendChild(titleOption);
      });
      removeBookForm.addEventListener('submit', event => {
        event.preventDefault();
        const selectedTitle = removeTitle.value;
        removeBook(selectedTitle);
        displayBooks();
        removeTitle.innerHTML = '';
        books.forEach(book => {
          const titleOption = document.createElement('option');
          titleOption.value = book.title;
          titleOption.innerText = book.title;
          removeTitle.appendChild(titleOption);
        });
      });
