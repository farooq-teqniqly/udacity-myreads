import { render, screen, fireEvent } from "@testing-library/react";
import { Book } from "./Book";

describe("Book component", () => {
  it("renders the title and authors", () => {
    // Arrange
    const mockOnShelfChanged = vi.fn();

    const book = {
      id: "abc",
      title: "Test book",
      authors: ["John Doe", "Jane Doe"],
      imageUrl: "http://foo.com",
    };

    // Act
    render(<Book book={book} onShelfChanged={mockOnShelfChanged} />);

    // Assert
    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(screen.getByText("John Doe, Jane Doe")).toBeInTheDocument();
  });

  it("renders the shelves in the dropdown", () => {
    // Arrange
    const mockOnShelfChanged = vi.fn();

    const book = {
      id: "abc",
      title: "Test book",
      authors: ["John Doe", "Jane Doe"],
      imageUrl: "http://foo.com",
    };

    //Act
    render(<Book book={book} onShelfChanged={mockOnShelfChanged} />);
    const dropdown = screen.getByRole("combobox");

    // Assert
    expect(dropdown).toBeInTheDocument();
    const options = screen.getAllByRole("option");
    const enabledOptions = options.filter((opt) => !opt.disabled);

    const expectedOptions = [
      "currentlyReading",
      "wantToRead",
      "alreadyRead",
      "none",
    ];

    expect(enabledOptions).toHaveLength(expectedOptions.length);
    expect(enabledOptions.map((opt) => opt.value)).toEqual(expectedOptions);
  });

  it("defaults book to the `none` shelf", () => {
    // Arrange
    const mockOnShelfChanged = vi.fn();

    const book = {
      id: "abc",
      title: "Test book",
      authors: ["John Doe", "Jane Doe"],
      imageUrl: "http://foo.com",
    };

    // Act
    render(<Book book={book} onShelfChanged={mockOnShelfChanged} />);
    const dropdown = screen.getByRole("combobox");

    // Assert
    expect(dropdown).toBeInTheDocument();
    expect(dropdown.value).toBe("none");
  });

  it("calls `onShelfChanged` with the correct shelf value", () => {
    // Arrange
    const mockOnShelfChanged = vi.fn();

    const book = {
      id: "abc",
      title: "Test book",
      authors: ["John Doe", "Jane Doe"],
      imageUrl: "http://foo.com",
    };

    const targetShelf = "wantToRead";

    //Act
    render(<Book book={book} onShelfChanged={mockOnShelfChanged} />);
    const dropdown = screen.getByRole("combobox");
    fireEvent.change(dropdown, { target: { value: targetShelf } });

    // Assert
    expect(mockOnShelfChanged).toHaveBeenCalledWith(book, targetShelf);
  });

  it("can move a book to `none`", () => {
    // Arrange
    const mockOnShelfChanged = vi.fn();

    const book = {
      id: "abc",
      title: "Test book",
      authors: ["John Doe", "Jane Doe"],
      imageUrl: "http://foo.com",
      currentShelf: "alreadyRead",
    };

    const targetShelf = "none";

    //Act
    render(<Book book={book} onShelfChanged={mockOnShelfChanged} />);
    const dropdown = screen.getByRole("combobox");
    expect(dropdown.value).toBe(book.currentShelf);
    fireEvent.change(dropdown, { target: { value: targetShelf } });

    // Assert
    expect(mockOnShelfChanged).toHaveBeenCalledWith(book, targetShelf);
  });
});
