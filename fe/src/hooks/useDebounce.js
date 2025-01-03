import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  if (!value) {
    throw new Error("value not provided");
  }

  if (!Number.isFinite(delay)) {
    throw new Error("delay must be a number greater than zero");
  }

  if (value < 1) {
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
