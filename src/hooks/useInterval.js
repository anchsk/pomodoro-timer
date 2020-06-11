//useInterval() hook from overreacted.io
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/

/* setInterval() and clearInterval() solution for React Hooks*/

import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  //Remember the last callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
