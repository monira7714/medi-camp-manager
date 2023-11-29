import { Navbar, Typography, Button, IconButton, Popover, PopoverHandler, PopoverContent, Collapse } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { getAuth } from "firebase/auth";
import { Avatar } from "@material-tailwind/react";

const NavBar = () => {

    const [openNav, setOpenNav] = useState(false);
    const { user, logOut } = useAuth();
    const auth = getAuth()
    console.log(auth.currentUser);

    const handleLogOut = () => {
        logOut()
            .then(result => console.log(result))
            .catch(error => console.error(error))
    }


    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to='/'><span className="flex items-center">Home</span></Link>
            </Typography>
            <Typography
                as="li"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to='/availableCamps'><span className="flex items-center">Available Camps</span></Link>
            </Typography>
            <Typography
                as="li"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link><span className="flex items-center">DashBoard</span></Link>
            </Typography>
            <Typography
                as="li"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to='/contactUs'><span className="flex items-center">Contact Us</span></Link>
            </Typography>
        </ul>
    );

    return (
        <div className="max-h-[768px] ">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-16 lg:py-4 shadow-none">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        className="mr-4 cursor-pointer py-1.5 font-medium flex items-center gap-4 text-2xl"
                    > <img className="w-[40px]" src="https://i.ibb.co/ZMZjKbS/camping-tent.png" alt="" />
                        Medi Camp Manager
                    </Typography>
                    <div className=" flex flex-row items-center justify-center gap-4 ">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className="flex items-center gap-x-1">
                            {user ? <div className=" ">
                                <Popover placement="bottom">
                                    <PopoverHandler>
                                        <Button variant="text"><Avatar src={auth.currentUser.photoURL} /></Button>
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <button onClick={handleLogOut} className="rounded-lg px-3 py-2 bg-black text-white "><span>Sign Out</span></button>
                                    </PopoverContent>
                                </Popover>
                            </div>
                                : <>
                                    <Link to='/register'>
                                        <Button variant="gradient" size="md" className="hidden lg:inline-block">
                                            <span>Sign Up</span>
                                        </Button>
                                    </Link>
                                    <Link to={'/login'}>
                                        <Button variant="gradient" size="md" className="hidden lg:inline-block">
                                            <span>Sign In</span>
                                        </Button>
                                    </Link>
                                </>
                            }
                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    {user ? <div className="lg:hidden">
                        <Popover placement="bottom">
                            <PopoverHandler>
                                <Button variant="text"><Avatar src={auth.currentUser.photoURL} /></Button>
                            </PopoverHandler>
                            <PopoverContent>
                                <Button onClick={handleLogOut} variant="gradient" size="md" className="-mt-1"><span>Sign Out</span></Button>
                            </PopoverContent>
                        </Popover>

                    </div>
                        : <div className="flex gap-4">
                            <Link to='/register'>
                                <Button variant="gradient" size="md" className="">
                                    <span>Sign Up</span>
                                </Button>
                            </Link>
                            <Link to={'/login'}>
                                <Button variant="gradient" size="md" className="">
                                    <span>Sign In</span>
                                </Button>
                            </Link>
                        </div >
                    }
                    {/* <div className="flex items-center gap-x-1">
                        <Link to='/register'>
                            <Button variant="gradient" size="md" className=" lg:inline-block">
                                <span>Sign Up</span>
                            </Button>
                        </Link>
                        <Link to={'/login'}>
                            <Button variant="gradient" size="md" className=" md:inline-block">
                                <span>Sign In</span>
                            </Button>
                        </Link>
                    </div> */}
                </Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;