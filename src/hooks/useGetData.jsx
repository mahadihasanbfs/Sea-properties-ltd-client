import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const baseUrl = `https://backend.seapropertiesltd.com.bd/`

const useGetData = (route) => {
    const { data: data = [], refetch } = useQuery({
        queryKey: ["data"],
        queryFn: async () => {
            const res = await fetch(`${baseUrl}/${route}`);
            const data = await res.json();
            return data;
        },
    });

    return data;
};

export default useGetData;



