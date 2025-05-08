import { useEffect } from "react";

const useScrollAnimation = () => {
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      // Debounce using requestAnimationFrame
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
      
      scrollTimeout = requestAnimationFrame(() => {
        const elements = document.querySelectorAll(".animate-on-scroll");
        elements.forEach((el) => {
          if (isElementInView(el)) {
            el.classList.add("visible");
          }
        });
      });
    };

    const isElementInView = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
      }
    };
  }, []);
};

export default useScrollAnimation;
