import bg from '../../../assets/gellaryBg.png';
import GellaryItem from './GellaryItem';
const Gellary = () => {

    const data = [
        {
            name: "Prime Locations"
        },
        {
            name: "Top Consultants "
        },
        {
            name: "Highest Quality Materials "
        },
        {
            name: "Prime Locations"
        },
        {
            name: "Highest Quality Materials "
        },
        {
            name: "Highest Quality Materials "
        }
    ]
    return (
        <div
            className='bg-cover object-cover py-24 flex items-center '
            style={{
                backgroundImage: `linear-gradient(#0000001a, #0000001c), url(${bg})`
            }}
        >
            <div className="container grid md:grid-cols-3 grid-cols-1 text-white gap-12">
                <div className=' h-full flex flex-col justify-center items-start'>
                    <h1 className="text-[40px] font-bold">
                        Project Gallery
                    </h1>
                    <p className="mt-6">
                        Partner with the best Artisan, to transform your land into a milestone of aesthetic marvel and superior value.
                    </p>
                    <button className="mt-6 border-2 duration-150 hover:bg-white hover:text-black px-8 py-2">
                        Explore
                    </button>
                </div>
                <div className="p-2 col-span-2 grid md:grid-cols-3 gap-6">
                    {
                        data?.map(itm => <GellaryItem key={itm?.name} itm={itm} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Gellary;