import { renderHook } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage hook", () => {
  it("save throws error when books not provided", () => {
    expect(() => renderHook(() => useLocalStorage().saveBooks())).toThrow(
      "books not provided"
    );
  });
});
