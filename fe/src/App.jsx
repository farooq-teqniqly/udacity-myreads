import "./App.css";
import { useEffect, useState } from "react";
import { Shelves } from "./components/Shelves";
import { Search } from "./components/Search";
import * as api from "./BooksAPI";
import { Route, Routes, useNavigate } from "react-router-dom";

const App = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [firstSearch, setFirstSearch] = useState(true);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const [shelves, setShelves] = useState({
    wantToRead: [],
    currentlyReading: [],
    alreadyRead: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await api.getAll();

      const downloadedBooks = res.map((book) => {
        const shelf = book.shelf === "read" ? "alreadyRead" : book.shelf;
        const authors =
          book.authors.length === 0 ? ["No authors listed."] : book.authors;

        return {
          id: book.id,
          title: book.title,
          authors: authors,
          imageUrl: book.imageLinks?.smallThumbnail,
          currentShelf: shelf,
        };
      }, []);

      const wantToReadBooks = downloadedBooks.filter(
        (book) => book.currentShelf === "wantToRead"
      );
      const currentlyReadingBooks = downloadedBooks.filter(
        (book) => book.currentShelf === "currentlyReading"
      );
      const alreadyReadBooks = downloadedBooks.filter(
        (book) => book.currentShelf === "alreadyRead"
      );

      const shelves = {
        wantToRead: wantToReadBooks,
        currentlyReading: currentlyReadingBooks,
        alreadyRead: alreadyReadBooks,
      };

      setShelves(shelves);
    };

    fetchBooks();
  }, [refetchTrigger]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 250);

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
        setFirstSearch(false);
        return;
      }

      const searchResultBooks = await Promise.all(
        res.map(async (book) => {
          const res = await api.get(book.id);
          let shelf = res["shelf"];

          if (!shelf) {
            shelf = "none";
          }

          if (shelf === "read") {
            shelf = "alreadyRead";
          }

          if (!book.authors) {
            book.authors = ["No authors listed"];
          }

          return {
            id: book.id,
            authors: book.authors,
            title: book.title,
            imageUrl: book.imageLinks?.smallThumbnail,
            currentShelf: shelf,
          };
        })
      );

      setSearchResults(searchResultBooks);
      setFirstSearch(false);
    };

    fetchSearchResults();
  }, [debouncedQuery, shelves]);

  const onShelfChanged = (book, newShelf) => {
    const updateBook = async () => {
      const shelf = newShelf === "alreadyRead" ? "read" : newShelf;
      const res = await api.update(book, shelf);

      const wantToReadBooks = await Promise.all(
        res["wantToRead"].map(async (bookId) => {
          return await api.get(bookId);
        })
      );

      const currentlyReadingBooks = await Promise.all(
        res["currentlyReading"].map(async (bookId) => {
          return await api.get(bookId);
        })
      );

      const alreadyReadBooks = await Promise.all(
        res["read"].map(async (bookId) => {
          return await api.get(bookId);
        })
      );

      const shelves = {
        wantToRead: wantToReadBooks,
        currentlyReading: currentlyReadingBooks,
        alreadyRead: alreadyReadBooks,
      };

      setShelves(shelves);
      setRefetchTrigger((prev) => !prev);
    };

    updateBook();
  };

  const openSearch = () => {
    navigate("/search");
  };

  const closeSearch = () => {
    setQuery("");
    setSearchResults([]);
    setFirstSearch(false);
    navigate("/");
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Shelves shelves={shelves} onShelfChanged={onShelfChanged} />
              </div>
              <div className="open-search">
                <a onClick={openSearch}>Add a book</a>
              </div>
            </div>
          }
        />
        <Route
          path="/search"
          element={
            <Search
              onClosed={closeSearch}
              onQueryChanged={(q) => setQuery(q)}
              searchResults={searchResults}
              onShelfChanged={onShelfChanged}
              shelves={shelves}
              firstSearch={firstSearch}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
