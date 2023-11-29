import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@material-tailwind/react';
import { FaTrophy } from "react-icons/fa6";

const Banner = () => {
    const { data:bannerInfo, isPending } = useQuery({
        queryKey: ['bannerInfo'],
        queryFn: () =>
          fetch('./bannerInfo.json')
          .then(
            (res) => res.json(),
          ),
      })
      if(isPending){
        return <Spinner className="h-16 w-16 text-gray-900/50 text-center" />
      }
    return (
        <div className='text-black mt-12'>
            {/* {data?.length} */}
            <Swiper slidesPerView={1} spaceBetween={30} navigation={true} pagination={{clickable:true,}} loop={true} modules={[Pagination, Navigation]} className="mySwiper">
                {
                    bannerInfo.map(item => <SwiperSlide className='pb-2' key={item.id}>
                        <div className='bg-indigo-100/30 flex lg:flex-row flex-col-reverse pt-6 justify-between items-center'>
                            <div className='md:pl-16 py-6 text-center md:space-y-4 space-y-2' >
                                <h1 className='md:text-6xl text-2xl'>{item.title}</h1>
                                <p className='md:text-3xl text-xl'>{item.service}</p>
                                <p className='md:text-2xl '>{item.place}</p>
                                <div className='flex justify-center gap-1 md:text-xl text-sm'>
                                    <FaTrophy className='mt-1'></FaTrophy>
                                    <span className='md:w-2/3'>{item.highlight}</span>
                                </div>
                            </div>
                            <img className='w-1/2 md:min-h-screen' src={item.img} />
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Banner;