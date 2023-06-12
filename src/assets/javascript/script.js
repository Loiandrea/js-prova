function fetchBookData() {
  const searchTerm = document.getElementById("search-input").value;
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayBookData(data);
    })
    .catch(error => {
      console.log("Error fetching book data:", error);
    });
}


function displayBookData(data) {
  const resultsElement = document.getElementById("results");
  resultsElement.innerHTML = "";

  if (data.docs && data.docs.length > 0) {
    data.docs.forEach(book => {
      const title = book.title || "Title not available";
      const key = book.key;

      const bookElement = document.createElement("div");
      bookElement.classList.add("book");

      const titleElement = document.createElement("h3");
      titleElement.textContent = title;
      titleElement.addEventListener("click", () => {
        fetchBookDescription(key, bookElement);
      });

      bookElement.appendChild(titleElement);

      resultsElement.appendChild(bookElement);
    });
  } else {
    const noResultsElement = document.createElement("p");
    noResultsElement.textContent = "No results found.";
    resultsElement.appendChild(noResultsElement);
  }
}

function fetchBookDescription(key, bookElement) {
  const url = `https://openlibrary.org${key}.json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const description = data.description || "Description not available";
      displayBookDescription(description, bookElement);
    })
    .catch(error => {
      console.log("Error fetching book description:", error);
    });
}

function displayBookDescription(description, bookElement) {
  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;

  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.appendChild(descriptionElement);

  bookElement.appendChild(cardElement);
}

// Event listener per il click del pulsante di ricerca
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", fetchBookData);
