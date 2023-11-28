import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { IoIosCalendar } from "react-icons/io";
import { FaCampground } from "react-icons/fa6";
import useTestimonials from "../../../Hooks/useTestimonials";

const Testimonials = () => {

    const { reviews } = useTestimonials();
    const recentReviews = reviews?.slice(-5)
    console.log(recentReviews);
    return (
        <div className="mx-20 md:my-20 my-8">
            <div className="text-center">
                <h1 className="text-4xl font-semibold pb-3">Testimonials</h1>
                <p className=" text-xl">Let&apos;s have a look what our client says</p>
            </div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    recentReviews?.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="flex flex-col items-center mx-24 my-16">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="py-8 w-2/3 text-center">{review.feedback}</p>
                            <h4 className="flex gap-2 items-center"><FaCampground></FaCampground>{review.campName}</h4>
                            <p className="flex gap-2 items-center"><IoIosCalendar></IoIosCalendar>{review.date}</p>
                            {/* <div className="flex gap-4 justify-between mb-4 items-center">
                            </div> */}
                            <h3 className="text-2xl text-[#151515] font-medium mt-6">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;