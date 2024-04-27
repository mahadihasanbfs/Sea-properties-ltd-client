import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(url);
      if (!res?.ok) {
        setLoading(true);
        setError(true);
        return;
      } else {
        const getData = await res.json();
        setData(getData);
      }
    } catch (error) {
      const { name, message, stack } = error;
      setError({ name, message, stack });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return [data, loading, error, refetch];
};

export default useFetchData;
