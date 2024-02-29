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

    // About us > board_of_directors images.
    const AboutUs_BoardOfDirectorImg = {
        img1: 'https://i.ibb.co/tZBLv7H/bfdd3c9bd06566b8c597396e70f5ed37.jpg',
        img2: 'https://i.ibb.co/ZB6D06V/4114245ce484d8e390e7fdd04ca882b8.jpg',
        img3: 'https://i.ibb.co/PYzV7PJ/75ab26b917cabe4f1c1b472b0ca3e229.jpg',
        img4: 'https://i.ibb.co/qsm9mkm/b1014863ecacb5a7c008a7510b802bf4.jpg',
        img5: 'https://i.ibb.co/LCwmxMg/4f41a86246da7cf2be71a5290e851f8a.jpg'
    }

    /** this function is used to make long text into chunk 
    * first parameter take the text and second parameter take the length of each chunk
    * NOTE: every chunk ends with a period '.' , so every chunk will not get same length. But it will be closer to the give length or grater.
    */
    const spilitTextIntoChunks = (text, chunkLength) => {
        const chunks = [];
        let startIndex = 0;

        while (startIndex < text.length) {
            let chunk = text.substr(startIndex, chunkLength);

            if (!(chunk.endsWith('.'))) {
                let lastIndexOfDot = chunk.lastIndexOf('.');
                if (lastIndexOfDot === -1) {
                    chunk = text.slice(startIndex, text.indexOf('.', startIndex) + 1);
                    chunks.push(chunk);
                    startIndex += (chunk.length + 1);
                } else {
                    chunk = text.substr(startIndex, lastIndexOfDot + 1);
                    chunks.push(chunk);
                    startIndex += (lastIndexOfDot + 1);
                }
            } else {
                chunks.push(chunk);
                startIndex += (chunk.lastIndexOf('.') + 1);
            }
        }

        return chunks;
    }

    const [user, setUser] = useState(null);

    const data = {
        AboutUs_OurStoryImg,
        AboutUs_BoardOfDirectorImg,
        user,
        setUser,
        spilitTextIntoChunks
    }


    return (
        <ContextApi.Provider value={data}>
            {children}
        </ContextApi.Provider>
    );
};

export default ContextProvider;