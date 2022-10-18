import { useEffect } from "react";

export function useClickOutside(ref, fun) {
  useEffect(() => {
    const listener = (e) => {
      // console.log(ref.current);
      //ref.current - to check if we have an element that exist
      //ref.current.contains(e.target) = to check if it contains the current element
      //if it contains the current element we don't want to do anything we want to do something
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      fun();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
}
