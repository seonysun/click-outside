import { useEffect, useRef } from "react";

interface Props<T extends HTMLElement> {
  ref: React.RefObject<T>;
  onClickOutside: () => void;
  enabled?: boolean;
}

export const useClickOutside = <T extends HTMLElement>({
  ref,
  onClickOutside,
  enabled = true,
}: Props<T>) => {
  const onClickRef = useRef(onClickOutside);
  useEffect(() => {
    onClickRef.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (!ref.current || !target) return;
      if (!ref.current.contains(target)) {
        onClickRef.current();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, enabled]);
};
