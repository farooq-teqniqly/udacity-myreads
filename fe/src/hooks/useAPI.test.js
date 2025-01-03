import { renderHook, act } from "@testing-library/react";
import { useAPI } from "./useAPI";
import * as API from "../BooksAPI";

describe("useAPI hook", () => {
  it("returns books", async () => {
    const mockBooks = Array(20).fill({}); // Mock 20 book results
    vi.spyOn(API, "search").mockResolvedValue(mockBooks);

    const { result } = renderHook(() => useAPI());
    const { search } = result.current;

    const { books } = await act(async () => await search("history"));
    expect(books.length).toBe(20);
  });

  it("returns empty books array when there are no results", async () => {
    vi.spyOn(API, "search").mockResolvedValue({ error: "not found" });

    const { result } = renderHook(() => useAPI());
    const { search } = result.current;

    const { books } = await act(async () => await search("xyz"));
    expect(books.length).toBe(0);
  });

  it("returns error on API failure", async () => {
    const mockError = new Error("fetch failed");
    vi.spyOn(API, "search").mockRejectedValue(mockError);

    const { result } = renderHook(() => useAPI());
    const { search } = result.current;

    const { error } = await act(async () => await search("history"));
    expect(error).toEqual("fetch failed");
  });
});
