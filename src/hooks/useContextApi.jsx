import { useContext } from "react";
import { ContextApi } from "../ContextProvider/ContextProvider";


const useContextApi = () => {
    const data = useContext(ContextApi);
    return data;
};

export default useContextApi;