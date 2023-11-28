import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Spinner } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { FaCalendar } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

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
        <div className='w-[900px] mx-20 my-12'>
            <div className='flex justify-center lg:pl-60'>
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
                    popularCamps?.map((camp,index) => <SwiperSlide  key={camp.id}>
                        <div className='flex items-center justify-center'>
                            <img className='w-[500px] h-[100vh] rounded-s-lg' src={camp.img} />
                            <div className='bg-blue-600 space-y-3 text-white h-[100vh] rounded-e-lg px-6 py-20 w-[400px]'>
                                <h1 className='text-center text-4xl font-bold'>{index+1}</h1>
                                <h1 className='text-3xl font-semibold'>Camp Name : {camp.name}</h1>
                                <h3 className='text-lg'> Healthcare Professionals in Attendance : {camp.professionals}</h3>
                                <h2>Special Service Provided : {camp.service}</h2>
                                <h4 className='flex gap-2 items-center'><FaCalendar className='text-black/60'></FaCalendar>{camp.date_time}</h4>
                                <h5 className='flex gap-2 items-center'><FaLocationDot className='text-black/60'></FaLocationDot>{camp.location}</h5>
                                <button className='bg-blue-900 rounded-lg px-4 py-2'>Details</button>
                            </div>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default PopularCamps;