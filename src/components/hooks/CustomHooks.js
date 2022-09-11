import { useState, useEffect } from "react";

/* useLocalStorage */
function getLocalStorageValue(key) {
  const storedValue = localStorage.getItem(key);
  try {
    return JSON.parse(storedValue);
  } catch {}
}

function setLocalStorageValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useLocalStorage(key, initialValue = null) {
  const storedValue = getLocalStorageValue(key);
  const [state, setState] = useState(storedValue || initialValue);

  useEffect((() => setLocalStorageValue(key, state)),[key,state])
  return  [state, setState]
}

/* useLocalStorage */
