import { useState } from "react";

const useSendData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [response, setResponse] = useState(null);

  const sendData = async (url, method, requestData) => {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (!res.ok) {
        throw new Error("Failed to send data");
      }
      setResponse(await res.json());
      setSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { sendData, loading, error, success, response };
};

export default useSendData;
