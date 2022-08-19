import { useState, useEffect } from "react";

const useHttp = (requestConfiq, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfiq.url, {
        method: requestConfiq.method ? requestConfiq.method : "GET",
        body: requestConfiq.body ? JSON.stringify(requestConfiq.body) : null,
        headers: requestConfiq.headers ? requestConfiq.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
