import { useCallback, useEffect, useState } from "react";

const useIntersectionObserver = ({ intersectionHandler }) => {
  // ref가 담길 state
  const [target, setTarget] = useState();

  // target element의 ref가 변경되면 호출.

  const isIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) intersectionHandler(entry, observer);
    },
    [intersectionHandler]
  );
  const serRef = useCallback((element) => {
    if (!element) return;
    setTarget(element);
  }, []);
  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(isIntersect, {
      threshold: 1,
    });
    observer.observe(target);

    return () => {
      observer.disconnect(target);
    };
  }, [target, isIntersect]);

  return { serRef };
};

export default useIntersectionObserver;
