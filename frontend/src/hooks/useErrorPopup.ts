import { useEffect, useState } from "react";

const useErrorPopup = (timeout = 5000) => {
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    if (errorText) {
      const timer = setTimeout(() => {
        setErrorText("");
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [errorText, timeout]);

  return {
    errorText,
    setErrorText,
    clearError: () => setErrorText(""),
  };
};

export default useErrorPopup;
