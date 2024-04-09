import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const baseUrl = `https://sea-properties-server.vercel.app`

const useGetData = (route) => {
    const [data, setData] = useState([]); // Initialize data as null
    useEffect(() => {
        fetch(`${baseUrl}/${route}`)
            .then(res => res.json())
            .then(data => setData(data))
        return () => {
            // Optionally do cleanup, if necessary
        };
    }, [route]);
    return data;
};

export default useGetData;



