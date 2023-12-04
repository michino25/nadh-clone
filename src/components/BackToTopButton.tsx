import { CaretUpFilled } from "@ant-design/icons";
import { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrolled = document.documentElement.scrollTop;
    setIsVisible(scrolled > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-20 right-8 w-10 h-10 bg-black/30 hover:bg-black/60 text-white border-0 rounded-full cursor-pointer ${
        isVisible ? "block" : "hidden"
      }`}
      onClick={scrollToTop}
    >
      <CaretUpFilled />
    </button>
  );
};

export default BackToTopButton;
