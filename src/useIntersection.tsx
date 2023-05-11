import { RefObject, useEffect, useState } from "react";

interface Args extends IntersectionObserverInit {}

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0 }: Args
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node: any = elementRef?.current;

    const observerParams = { threshold };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef?.current, JSON.stringify(threshold)]);

  return entry;
}

export default useIntersectionObserver;
