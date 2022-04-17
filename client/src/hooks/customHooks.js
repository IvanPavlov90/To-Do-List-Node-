import { useState } from "react";

export function useInput(initial) {
  const [value, setValue] = useState(initial);
  return {
    value,
    onChange: e => setValue(e.target.value),
  };
}

export function useCheckbox(initial) {
    let [value, setValue] = useState(initial);
    return {
      value,
      onChange: () => setValue((prevValue) => value = !prevValue),
    };
  }
