import { useContext } from "react";
import { ContextApi } from "../Provider/ContextProvider";


const useContextApi = () => {
    const data = useContext(ContextApi);
    return data;
};

export default useContextApi;