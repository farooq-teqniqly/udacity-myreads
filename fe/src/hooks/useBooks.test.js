import { renderHook } from "@testing-library/react";
import { useBooks } from "./useBooks";

describe("useBooks hook", () => {
  it("should throw an error when a book repository is not provided", () => {
    expect(() => renderHook(() => useBooks())).toThrow(
      "provide a book repository to the useBooks hook"
    );
  });
});
