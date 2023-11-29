import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@material-tailwind/react';
import { FaCalendar } from 'react-icons/fa6';

const UpComing = () => {

    const { data: upComings, isPending } = useQuery({
        queryKey: ['upComing'],
        queryFn: () =>
            fetch('./upComing.json')
                .then(
                    (res) => res.json(),
                )
    })
    if (isPending) {
        return <Spinner className="h-16 w-16 text-gray-900/50 text-center" />
    }

    return (
        <div className='pb-8'>
            <div className='flex justify-center'>
                <h1 className='md:text-4xl text-2xl font-semibold mb-16 text-center'>Upcoming Medical Camps</h1>
            </div>
            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    upComings?.map(item => <SwiperSlide className='pb-8' key={item.id}>
                        <img className='lg:w-[450px] w-[350px] lg:h-[400px] h-[200px]' src={item.img} />
                        <div className='my-4 md:h-[150px] px-4 py-2 text-center rounded-lg bg-blue-gray-300 hidden'>
                            <h1 className='md:text-xl font-semibold'>{item.campName}</h1>
                            <p className='flex gap-3 items-center justify-center'><FaCalendar></FaCalendar>{item.date}</p>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default UpComing;