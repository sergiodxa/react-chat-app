import React from "react";

function useLocalState(key, initialValue = "") {
  const [state, setState] = React.useState(initialValue);

  const update = React.useCallback(
    newState => {
      const result =
        typeof newState === "function" ? newState(state) : newState;
      localStorage.setItem(
        key,
        typeof result === "object" ? JSON.stringify(result) : result
      );
      setState(result);
    },
    [key, JSON.stringify(state)]
  );

  const clear = React.useCallback(() => {
    localStorage.setItem(
      key,
      typeof initialValue === "object"
        ? JSON.stringify(initialValue)
        : initialValue
    );
    setState(initialValue);
  }, [key, setState, initialValue]);

  // grab stored state value from localStorage
  React.useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      update(value || initialValue);
    } catch (error) {
      const value = localStorage.getItem(key);
      update(value || initialValue);
    }
  }, [key, update, initialValue]);

  return [state, update, clear];
}

export default useLocalState;
