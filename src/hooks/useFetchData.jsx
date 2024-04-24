import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // console.log(url, "...............");
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res?.ok) {
          setLoading(true);
          setError(true);
          return;
        } else {
          const getData = await res.json();
          console.log(getData);
          setData(getData);
        }
      } catch (error) {
        const { name, message, stack } = error;
        setError({ name, message, stack });
      }
    };
    fetchData();
  }, [url]);

  return [data, loading, error];
};

export default useFetchData;
