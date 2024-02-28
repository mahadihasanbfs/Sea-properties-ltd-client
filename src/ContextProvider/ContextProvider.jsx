import { createContext, useState } from "react";

export const ContextApi = createContext(null);

const ContextProvider = ({ children }) => {
    // About us > our_story section images.
    const AboutUs_OurStoryImg = {
        img1: 'https://i.ibb.co/23LKrqS/Rectangle-22.png',
        img2: 'https://i.ibb.co/vJ95H3B/ef0a8b820d184c5c83ed52c8dec5a2f0.jpg',
        img3: 'https://i.ibb.co/M2j77PS/54f589794579f9ca7859b8a91c86d1cb.jpg',
        img4: 'https://i.ibb.co/Qdh4F1W/998b0df807008637eb4b0f8dc08f4830.jpg',
        img5: 'https://i.ibb.co/3dWP8zH/Group-86.png'
    }

    const [user, setUser] = useState(null);

    const data = {
        AboutUs_OurStoryImg,
        user,
        setUser
    }

    
    return (
        <ContextApi.Provider value={data}>
            {children}
        </ContextApi.Provider>
    );
};

export default ContextProvider;