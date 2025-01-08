import "./App.css";
import { useEffect, useState } from "react";
import { Shelves } from "./components/Shelves";
import { Search } from "./components/Search";
import * as api from "./BooksAPI";

const App = () => {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [shelves, setShelves] = useState({
    wantToRead: [],
    currentlyReading: [],
    alreadyRead: [],
  });

  useEffect(() => {
    const savedShelves = JSON.parse(localStorage.getItem("shelves")) || {
      wantToRead: [],
      currentlyReading: [],
      alreadyRead: [],
    };

    setShelves(savedShelves);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const transformedQuery = debouncedQuery.trim().toLowerCase();

      if (transformedQuery.length === 0) {
        setSearchResults([]);
        return;
      }

      const res = await api.search(transformedQuery);

      if (res.error) {
        setSearchResults([]);
        return;
      }

      const books = res.map((book) => {
        if (!book.authors) {
          book.authors = ["No authors listed"];
        }

        return {
          id: book.id,
          authors: book.authors,
          title: book.title,
          imageUrl: book.imageLinks?.smallThumbnail,
        };
      });

      setSearchResults(books);
    };

    fetchSearchResults();
  }, [debouncedQuery, shelves]);

  const onShelfChanged = (book, newShelf) => {
    const updatedShelves = {
      wantToRead: shelves.wantToRead.filter((b) => b.id !== book.id),
      currentlyReading: shelves.currentlyReading.filter(
        (b) => b.id !== book.id
      ),
      alreadyRead: shelves.alreadyRead.filter((b) => b.id !== book.id),
    };

    if (newShelf !== "none") {
      updatedShelves[newShelf] = [...updatedShelves[newShelf], book];
    }

    setShelves(updatedShelves);
    localStorage.setItem("shelves", JSON.stringify(updatedShelves));
  };

  const onSearchClosed = () => {
    setShowSearchpage(false);
    setQuery("");
    setSearchResults([]);
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <Search
          onClosed={onSearchClosed}
          onQueryChanged={(q) => setQuery(q)}
          searchResults={searchResults}
          onShelfChanged={onShelfChanged}
        />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Shelves
              shelves={shelves}
              onShelfChanged={onShelfChanged}
            ></Shelves>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(true)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
