import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce hook", () => {
  it("should throw an error when value not provided", () => {
    expect(() => renderHook(() => useDebounce(null, 1000))).toThrow(
      "value not provided"
    );
  });

  it("should throw an error when delay is not a number", () => {
    expect(() => renderHook(() => useDebounce([], "delay"))).toThrow(
      "delay must be a number greater than zero"
    );
  });

  it("should throw an error when number is not in range", () => {
    const invalidDelays = [-Infinity, -1, 0, Infinity];

    invalidDelays.forEach((delay) => {
      expect(() => renderHook(() => useDebounce([], delay))).toThrow(
        "delay must be a number greater than zero"
      );
    });
  });

  it("initializes with the correct default state", () => {
    const { result } = renderHook(() => useDebounce("value", 1000));

    expect(result.current.debouncedValue).toBe("value");
  });

  it("should update debounced value after the delay", async () => {
    const delay = 1000;

    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay },
      }
    );

    expect(result.current.debouncedValue).toBe("initial");

    rerender({ value: "updated", delay });

    expect(result.current.debouncedValue).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(delay - 1);
    });

    expect(result.current.debouncedValue).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current.debouncedValue).toBe("updated");

    vi.useRealTimers();
  });
});
