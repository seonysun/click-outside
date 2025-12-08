import { useEffect } from "react";

interface Props<T extends HTMLElement> {
  ref: React.RefObject<T>;
  onClickOutside: () => void;
}

export const useClickOutside = <T extends HTMLElement>({
  ref,
  onClickOutside,
}: Props<T>) => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [ref, onClickOutside]);
};
