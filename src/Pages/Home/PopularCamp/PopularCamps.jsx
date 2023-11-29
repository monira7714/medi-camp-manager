import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Spinner } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { FaCalendar } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const PopularCamps = () => {

    const { data: allCamps, isPending } = useQuery({
        queryKey: ['allCamps'],
        queryFn: () =>
            fetch('./allCamps.json')
                .then(
                    (res) => res.json(),
                )
    })
    if (isPending) {
        return <Spinner className="h-16 w-16 text-gray-900/50 text-center" />
    }

    const popularCamps = allCamps.filter(camps => camps.tag === "popular");
    // console.log(popularCamps?.length);

    return (
        <div className='lg:w-[900px] md:w-[550px] w-[300px] md:mx-8 lg:mx-20 -mx-4 my-12'>
            <div className='flex justify-center lg:pl-60 md:pl-0 pl-12'>
                <h1 className='text-4xl font-semibold mb-16 text-center'>Popular Medical Camps</h1>
            </div>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                // loop={true}
                modules={[EffectCards]}
                className="mySwiper "
            >
                {
                    popularCamps?.map((camp, index) => <SwiperSlide key={camp.id}>
                        <div className='flex md:flex-row flex-col items-center justify-center'>
                            <img className='w-[250px] md:w-[250px] lg:w-[500px] md:h-[100vh] h-[250px] rounded-s-lg' src={camp.img} />
                            <div className='bg-blue-600 md:space-y-3 space-y-2 text-white md:h-[100vh] rounded-e-lg px-6 lg:py-20 py-6 lg:w-[400px] md:w-[300px] w-[250px]'>
                                <h1 className='text-center lg:text-4xl text-xl font-bold'>{index + 1}</h1>
                                <h1 className='lg:text-3xl md:text-xl text-lg font-semibold'>Camp Name : {camp.name}</h1>
                                <h3 className='lg:text-lg md:text-base text-sm'> Healthcare Professionals in Attendance : {camp.professionals}</h3>
                                <h2 className='lg:text-lg md:text-base text-sm'>Special Service Provided : {camp.service}</h2>
                                <h4 className='flex gap-2 items-center lg:text-base text-sm'><FaCalendar className='text-black/60'></FaCalendar>{camp.date_time}</h4>
                                <h5 className='flex gap-2 items-center lg:text-base text-sm'><FaLocationDot className='text-black/60'></FaLocationDot>{camp.location}</h5>
                                <button className='bg-blue-900 rounded-lg px-4 py-2'>Details</button>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
            <Link to='/availableCamps'><button className='bg-blue-800 w-[200px] lg:mx-96 md:mx-44 mx-20 px-4 py-2 rounded-lg text-white my-12 text-2xl '>Show All</button></Link>
        </div>
    );
};

export default PopularCamps;