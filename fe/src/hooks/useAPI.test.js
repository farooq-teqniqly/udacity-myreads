import { useAPI } from "./useAPI";
import * as API from "../BooksAPI";

describe("useAPI hook", () => {
  it("returns books", async () => {
    const { search } = useAPI();
    const { books } = await search("history");
    expect(books.length).toBe(20);
  });

  it("returns empty books array when there are no results", async () => {
    const { search } = useAPI();
    const { books } = await search("xyz");
    expect(books.length).toBe(0);
  });

  it("returns error on API failure", async () => {
    const mockError = new Error("fetch failed");
    vi.spyOn(API, "search").mockRejectedValue(mockError);

    const { search } = useAPI();
    const { error } = await search("history");

    expect(error).toEqual("fetch failed");
  });
});
