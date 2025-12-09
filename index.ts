import { useEffect, useRef } from "react";

interface Props<T extends HTMLElement> {
  ref: React.RefObject<T>;
  onClickOutside: () => void;
  enabled?: boolean;
  eventType?: "pointerdown" | "mousedown" | "touchstart";
}

export const useClickOutside = <T extends HTMLElement>({
  ref,
  onClickOutside,
  enabled = true,
  eventType = "pointerdown",
}: Props<T>) => {
  const onClickRef = useRef(onClickOutside);
  useEffect(() => {
    onClickRef.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: Event) => {
      const target = e.target as Node;

      if (!ref.current || !target) return;
      if (!ref.current.contains(target)) {
        onClickRef.current();
      }
    };

    document.addEventListener(eventType, handleClick);

    return () => {
      document.removeEventListener(eventType, handleClick);
    };
  }, [ref, enabled]);
};
