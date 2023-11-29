import { Spinner } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { FaCalendar, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AvailableCamps = () => {

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

    return (
        <div className="lg:mx-40 md:mx-12 grid lg:grid-cols-2 grid-cols-1 gap-6 items-center my-12">
            {
                allCamps?.map(camp => <Card key={camp.id} className="mt-6">
                    <CardHeader color="blue-gray" className="relative ">
                        <img className="w-full h-[300px]" src={camp.img} />
                    </CardHeader>
                    <CardBody className="space-y-2">
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            {camp.name}
                        </Typography>
                        <Typography className="text-black"><span className="text-black font-semibold">Healthcare Professionals in Attendance :</span> {camp.professionals}</Typography>
                        <Typography className="text-black"><span className="text-black font-semibold">Special Service Provided : </span>{camp.service}</Typography>
                        <Typography className="text-black"><span className="text-black font-semibold">Target Audience : </span>{camp.audience}</Typography>
                        <Typography className='font-bold text-black'>Price : ${camp.fees}</Typography>
                        <Typography>{camp.details}
                        </Typography>
                        <Typography>
                            <h4 className='flex gap-2 items-center lg:text-base text-sm'><FaCalendar className='text-black/60'></FaCalendar>{camp.date_time}</h4>
                            <h5 className='flex gap-2 items-center lg:text-base text-sm'><FaLocationDot className='text-black/60'></FaLocationDot>{camp.location}</h5>
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                    <Link to={`/camp-details/${camp.id}`}><button className='bg-blue-900 rounded-lg px-4 py-2 my-2 text-white'>Details</button></Link>
                    </CardFooter>
                </Card>)
            }
        </div>
    );
};

export default AvailableCamps;