import { useCallback, useMemo } from "react";
import * as API from "../BooksAPI";

export const useAPI = () => {
  const search = useCallback(async (searchTerm) => {
    try {
      const res = await API.search(searchTerm.trim());

      if (res.error) {
        return {
          books: [],
        };
      }

      return {
        books: res,
      };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }, []);

  return useMemo(() => ({ search }), [search]);
};
