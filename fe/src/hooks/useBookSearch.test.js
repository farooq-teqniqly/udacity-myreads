import { act, renderHook } from "@testing-library/react";
import { useBookSearch } from "./useBookSearch";
import { useBookshelves } from "./useBookshelves";

describe("useBookSearch hook", () => {
  const mockUseAPI = { search: vi.fn() };
  const { BOOKSHELF_NONE } = useBookshelves();

  it("should throw an error when useAPI hook not provider", () => {
    expect(() => renderHook(() => useBookSearch())).toThrow(
      "provide the useAPI hook to this hook"
    );
  });

  it("should throw error when search term not provided", async () => {
    const { result } = renderHook(() => useBookSearch(mockUseAPI));

    await expect(async () => {
      await act(async () => {
        await result.current.search();
      });
    }).rejects.toThrow("searchTerm not provided");
  });

  it("initializes with the correct default state", () => {
    const { result } = renderHook(() => useBookSearch(mockUseAPI));

    expect(result.current.searchError).toBe(false);
    expect(result.current.resultCount).toBe(0);
    expect(result.current.searchResults).toEqual([]);
  });

  it("reflects API errors in the searchError state", async () => {
    mockUseAPI.search.mockResolvedValue({ error: "fetch failed" });
    const { result } = renderHook(() => useBookSearch(mockUseAPI));

    await act(async () => {
      await result.current.search("history");
    });

    expect(result.current.searchError).toBe(true);
    expect(result.current.resultCount).toBe(0);
    expect(result.current.searchResults).toEqual([]);
  });

  it("sets the state correctly when books are found", async () => {
    const mockBooks = [
      {
        id: "1",
        title: "Book One",
        authors: ["Author A"],
        imageLinks: { smallThumbnail: "http://example.com/image1.jpg" },
      },
      {
        id: "2",
        title: "Book Two",
        authors: ["Author B"],
        imageLinks: { smallThumbnail: "http://example.com/image2.jpg" },
      },
    ];

    mockUseAPI.search.mockResolvedValue({ books: mockBooks });
    const { result } = renderHook(() => useBookSearch(mockUseAPI));

    await act(async () => {
      await result.current.search("history");
    });

    expect(result.current.searchError).toBe(false);
    expect(result.current.resultCount).toBe(mockBooks.length);

    expect(result.current.searchResults).toEqual([
      {
        id: "1",
        title: "Book One",
        authors: ["Author A"],
        imageUrl: "http://example.com/image1.jpg",
        bookshelfId: BOOKSHELF_NONE,
      },
      {
        id: "2",
        title: "Book Two",
        authors: ["Author B"],
        imageUrl: "http://example.com/image2.jpg",
        bookshelfId: BOOKSHELF_NONE,
      },
    ]);
  });

  it("should update the state correctly for multiple calls", async () => {
    const mockBooks1 = [
      {
        id: "1",
        title: "Book One",
        authors: ["Author A"],
        imageLinks: { smallThumbnail: "http://example.com/image1.jpg" },
      },
    ];

    const mockBooks2 = [
      {
        id: "2",
        title: "Book Two",
        authors: ["Author B"],
        imageLinks: { smallThumbnail: "http://example.com/image2.jpg" },
      },
      {
        id: "3",
        title: "Book Three",
        authors: ["Author C"],
        imageLinks: { smallThumbnail: "http://example.com/image3.jpg" },
      },
    ];

    mockUseAPI.search
      .mockResolvedValueOnce({ books: mockBooks1 })
      .mockResolvedValueOnce({ books: mockBooks2 });

    const { result } = renderHook(() => useBookSearch(mockUseAPI));

    await act(async () => {
      await result.current.search("search 1");
    });

    expect(result.current.searchError).toBe(false);
    expect(result.current.resultCount).toBe(1);

    expect(result.current.searchResults).toEqual([
      {
        id: "1",
        title: "Book One",
        authors: ["Author A"],
        imageUrl: "http://example.com/image1.jpg",
        bookshelfId: BOOKSHELF_NONE,
      },
    ]);

    await act(async () => {
      await result.current.search("search 2");
    });

    expect(result.current.searchError).toBe(false);
    expect(result.current.resultCount).toBe(2);

    expect(result.current.searchResults).toEqual([
      {
        id: "2",
        title: "Book Two",
        authors: ["Author B"],
        imageUrl: "http://example.com/image2.jpg",
        bookshelfId: BOOKSHELF_NONE,
      },
      {
        id: "3",
        title: "Book Three",
        authors: ["Author C"],
        imageUrl: "http://example.com/image3.jpg",
        bookshelfId: BOOKSHELF_NONE,
      },
    ]);
  });
});
