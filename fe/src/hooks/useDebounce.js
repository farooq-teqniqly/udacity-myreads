import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  if (typeof value === "undefined") {
    throw new Error("value not provided");
  }

  if (value === null) {
    throw new Error("value not provided");
  }

  if (!Number.isFinite(delay)) {
    throw new Error("delay must be a number greater than zero");
  }

  if (delay < 1) {
    throw new Error("delay must be a number greater than zero");
  }

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return { debouncedValue };
};
