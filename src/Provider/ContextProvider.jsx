import { createContext } from "react";

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

    //About us > management_team images.
    const AboutUs_ManagementTeamImg = {
        bannerImg: 'https://i.ibb.co/NFP8Wtw/e3c0bfef15616d1d15d0db075a923ce3.jpg',
        CeoImg: 'https://i.ibb.co/djgvZz5/3822bc60faf2f513ee994b619efe16e8.jpg',
        SeniorManagerImg: {
            img1: 'https://i.ibb.co/cYGkG68/cf20898a3150ceff0e49865a70aeacb8.jpg',
            img2: 'https://i.ibb.co/r050pq9/25de5588c3b066d8c4a9eadaf8b476b6.jpg',
            img3: 'https://i.ibb.co/KD74gZz/5548ef866e20da11c483c897c71aa491.jpg'
        },
        teamImg: 'https://i.ibb.co/HtqPqBv/ba77c73c88b36368cff4c3193651f0c2.jpg'
    }

    //About us > management_team images.
    const AboutUs_CompaniesImg = {
        bannerImg: 'https://i.ibb.co/fxFPQJQ/0a33a890b0b1e6309ed3f558374420ec.jpg'
    }

    //About us > OurClient images.
    const AboutUs_OurClientImg = {
        bannerImg: 'https://i.ibb.co/tZBLv7H/bfdd3c9bd06566b8c597396e70f5ed37.jpg',
        clientComapnyLogo: [
            'https://i.ibb.co/3fbJbmJ/9e190068a7c60c6a30dc000bf3a5c2e0.png',
            ' https://i.ibb.co/xCLFCKD/Apple-Logo-500x281-min-1-1.png',
            'https://i.ibb.co/Q9rTHQ1/Apple-Logo-500x281-min-1.png',
            'https://i.ibb.co/9hHjx2n/b7060252aaebfd0c763e3abf2041ff6d.png',
            'https://i.ibb.co/Q9rTHQ1/Apple-Logo-500x281-min-1.png',
            'https://i.ibb.co/3fbJbmJ/9e190068a7c60c6a30dc000bf3a5c2e0.png',
            'https://i.ibb.co/9hHjx2n/b7060252aaebfd0c763e3abf2041ff6d.png',
            ' https://i.ibb.co/xCLFCKD/Apple-Logo-500x281-min-1-1.png',

        ]
    }

    //About us > CSR images.
    const AboutUs_CSR = {
        bannerImg: 'https://i.ibb.co/56SNQm7/5bcb89238798f28195420c944d8417bd.jpg',
        csrImages: [
            'https://i.ibb.co/VTssj56/f7730664622499a14e90be7ace191ed7.jpg',
            'https://i.ibb.co/MgRyTHx/e49a3032be95c987dc35bbd387be39e0.jpg',
            'https://i.ibb.co/WPKBM7d/9e5121bac6b9ef9b5df65a1bbce1362c.jpg',
            'https://i.ibb.co/4KBXrzk/608ae7b7f7a9b2e93c360e92386f615a.jpg',
            'https://i.ibb.co/BP4XRDv/c2625babcc1b3ac504981a5e96da037a.jpg',
            'https://i.ibb.co/3h4BNF9/d5b6f7fd8ef18c12bf78d4110e8037fe.jpg',
            'https://i.ibb.co/mTsyzMk/316d4ada742f78925b2d491f1c10ef60.jpg',
            'https://i.ibb.co/VmqNQGx/995a0e31b4a162f7bfbcf6e5ec65ec9a.jpg',
            'https://i.ibb.co/YfVVPS6/a839ed2cb5c54c9ed8172c04b631e80d.jpg',
            'https://i.ibb.co/fdxXx80/1a12bd28404f210edb9381881e5db514.jpg',
            'https://i.ibb.co/z5hCCqH/43738167396762a8b69d090c5f188f43.jpg',
            'https://i.ibb.co/1bG99Cp/d232ecec51e0a6d51620a66953a994fb.jpg'

        ]
    }

    //About us > CSR images.
    const newsEventsImg = {
        bannerImg: 'https://i.ibb.co/Hq8TFQx/ce7c5c73f58b27683398d6d3f2ff0948.jpg'
    }


    //About us > CSR images.
    const ContactPageImg = {
        bannerImg: 'https://i.ibb.co/6XGbmhk/ee5e153c845c64d72d37110d52055899.jpg',
        contactImg: 'https://i.ibb.co/37FgM17/26f915c6ea4e23f3e3f84a55b2cae2ab.jpg'
    }


    /** this function is used to make long text into chunk 
    * first parameter take the text and second parameter take the length of each chunk
    * NOTE: every chunk ends with a period '.' , every chunk will not get same length. But it will be closer to the give length or grater.
    */
    const spilitTextIntoChunks = (text, chunkLength) => {
        const chunks = [];
        let startIndex = 0;

        while (startIndex < text?.length) {
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

    const data = {
        AboutUs_OurStoryImg,
        AboutUs_BoardOfDirectorImg,
        AboutUs_ManagementTeamImg,
        AboutUs_CompaniesImg,
        AboutUs_OurClientImg,
        AboutUs_CSR,
        newsEventsImg,
        ContactPageImg,
        spilitTextIntoChunks
    }


    return (
        <ContextApi.Provider value={data}>
            {children}
        </ContextApi.Provider>
    );
};

export default ContextProvider;