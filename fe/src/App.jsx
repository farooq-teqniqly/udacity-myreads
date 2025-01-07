import "./App.css";
import { useState } from "react";
import { Shelves } from "./components/Shelves";
import { Search } from "./components/Search";

const App = () => {
  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <div className="app">
      {showSearchPage ? (
        <Search onClosed={() => setShowSearchpage(false)} />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Shelves></Shelves>
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
