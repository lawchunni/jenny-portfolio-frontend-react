import { useState } from "react";

/**
 * 
 * @param {*} keyName local storage key 
 * @param {*} defaultValue local storage value
 * @returns set value
 */
const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  // get item from localstorage first, if not null, set as default item
  const setValue = (newValue) => {

    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  }
  return [storedValue, setValue];
}

/**
 * 
 * @param {*} keyName local storage key
 * @returns key value pairs if key exists
 */
const getLocalStorage = (keyName) => {
  const value = localStorage.getItem(keyName);

  return value ? value : null;
}

/**
 * 
 * @param {*} keyName local storage key
 * remove localstorage if key exists
 */
const removeLocalStorage = (keyName) => {
  const value = getLocalStorage(keyName);

  if (value) {
    localStorage.removeItem(keyName);
  }
}

export { useLocalStorage, getLocalStorage, removeLocalStorage};
