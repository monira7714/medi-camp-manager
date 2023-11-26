import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@material-tailwind/react';
import { FaTrophy } from "react-icons/fa6";

const Banner = () => {
    const { data:bannerInfo, isPending } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
          fetch('./bannerInfo.json').then(
            (res) => res.json(),
          ),
      })
      if(isPending){
        return <Spinner className="h-16 w-16 text-gray-900/50 text-center" />
      }
    return (
        <div className='text-black'>
            {/* {data?.length} */}
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    bannerInfo.map(item => <SwiperSlide key={item.id}>
                        <div className='bg-indigo-100/30 flex justify-between items-center'>
                            <div className='pl-16 space-y-4'>
                                <h1 className='text-6xl'>{item.title}</h1>
                                <p className='text-3xl'>{item.service}</p>
                                <p className='text-2xl'>{item.place}</p>
                                <div className='flex gap-1 text-xl'>
                                    <FaTrophy className='mt-1'></FaTrophy>
                                    <span className='w-2/3'>{item.highlight}</span>
                                </div>
                            </div>
                            <img className='w-1/2 min-h-screen' src={item.img} />
                        </div>
                    </SwiperSlide>)
                }
                
                
            </Swiper>
        </div>
    );
};

export default Banner;