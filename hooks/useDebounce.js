import React from "react";

export default function useDebounce(func, milliseconds) {
  const time = milliseconds || 500;
  let timer;

  return (event) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(func, time, event);
  };
}
