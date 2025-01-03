const LOCAL_STORAGE_KEY = "myreads-books";

export const useLocalStorage = () => {
  const loadBooks = () =>
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

  const saveBooks = (books) => {
    if (!books) {
      throw new Error("books not provided");
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  };

  return {
    loadBooks,
    saveBooks,
  };
};
