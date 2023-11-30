import { Card, CardBody, CardFooter, CardHeader, Spinner, Typography, Button, Dialog, Input } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCalendar, FaLocationDot } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const CampDetails = () => {
    const { campId } = useParams();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset, setValue } = useForm();
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        register('gender'); // register input
        setValue('gender', 'Male'); // set default value
      }, [register, setValue]);

    
    // console.log(campId);

    const { data: allCamps, isPending } = useQuery({
        queryKey: ['allCamps'],
        queryFn: () =>
            fetch('/allCamps.json')
                .then(
                    (res) => res.json(),
                )
    })
    if (isPending) {
        return <Spinner className="h-16 w-16 text-gray-900/50 text-center" />
    }

    const handleOpen = () => setOpen((cur) => !cur);

    const camp = allCamps.find(item => item.id == campId);
    // console.log(allCamps,camp);
    const { name, img, date_time, audience, location, details, fees, id } = camp;
    
    const onSubmit = data => {
        const fee = fees
        const participantInfo = {
            name: data.name,
            age: data.age,
            address: data.address,
            phone: data.phone,
            contact:data.contact,
            gender: data.gender,
            health: data.health,
            fees: fee,
            id: id
        }
        console.log(participantInfo);
        axiosPublic.post('/joinCamp', participantInfo)
        .then(res => {
            if (res.data.insertedId) {
                console.log('Participant added to the database')
                reset();
            }
        })
    }

    return (
        <div className="lg:mx-44 md:mx-24 mx-12 my-12">
            <Card key={camp.id} className="mt-6">
                <CardHeader color="blue-gray" className="relative ">
                    <img className="w-full h-[400px]" src={img} />
                </CardHeader>
                <CardBody className="space-y-2">
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {name}
                    </Typography>
                    <Typography className="text-black"><span className="text-black font-semibold">Target Audience : </span>{audience}</Typography>
                    <Typography>{details}
                    </Typography>
                    <Typography>
                        <h4 className='flex gap-2 items-center lg:text-base text-sm'><FaCalendar className='text-black/60'></FaCalendar>{date_time}</h4>
                        <h5 className='flex gap-2 items-center lg:text-base text-sm'><FaLocationDot className='text-black/60'></FaLocationDot>{location}</h5>
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <button onClick={handleOpen} className='bg-blue-900 rounded-lg px-4 py-2 my-2 text-white'>Join Camp</button>
                    <Dialog
                        size="xl"
                        open={open}
                        handler={handleOpen}
                        className="bg-transparent shadow-none"
                    >
                        <Card className="mx-auto w-full">
                            <CardBody className="flex flex-col gap-4">
                                <form onSubmit={handleSubmit(onSubmit)} className="">
                                    <div className="flex gap-4 mb-4">
                                        <Input label="Name" size="lg"  {...register("name", { required: true })} />

                                        <Input label="Age" size="lg"  {...register("age", { required: true })} />
                                    </div>
                                    <div className="flex gap-8 mb-4"  >
                                        <select defaultValue="Male" {...register("gender", { required: true })}>
                                            <option value="Select Gender">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <Input label={fees} defaultValue={fees} size="md" disabled  {...register("fees")}  />
                                        <Input label="Phone" size="md" {...register("phone", { required: true })} />
                                    </div>
                                    <div className=" flex flex-col gap-4 mb-4">
                                        <Input label="Address" size="lg" {...register("address", { required: true })} />
                                        <Input label="Specific Health Condition" size="lg" {...register("health", { required: true })} />
                                        <Input label="Emergency Contact" size="lg" {...register("contact", { required: true })} />
                                    </div>
                                    <Button onClick={handleOpen} >
                                        <input type="submit" value="Join Camp"/>
                                    </Button>
                                    {/* <Button className="ml-4" variant="gradient" onClick={handleOpen}> Close
                                    </Button> */}
                                </form>
                            </CardBody>
                        </Card>
                    </Dialog>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CampDetails;