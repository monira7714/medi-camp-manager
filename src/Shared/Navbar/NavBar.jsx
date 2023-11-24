import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

    const [openNav, setOpenNav] = useState(false);

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
                variant="medium"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to='/'><a className="flex items-center">Home</a></Link>
            </Typography>
            <Typography
                as="li"
                variant="medium"
                color="blue-gray"
                className="p-1 font-normal"
            >
               <Link><a className="flex items-center">Available Camps</a></Link>
            </Typography>
            <Typography
                as="li"
                variant="medium"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link><a className="flex items-center">DashBoard</a></Link>
            </Typography>
            <Typography
                as="li"
                variant="medium"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link><a className="flex items-center">Contact Us</a></Link>
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
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className="flex items-center gap-x-1">
                            <Button
                                variant="gradient"
                                size="md"
                                className="hidden lg:inline-block"
                            >
                                <span>Sign Up</span>
                            </Button>
                            <Button
                                variant="gradient"
                                size="md"
                                className="hidden lg:inline-block"
                            >
                                <span>Sign In</span>
                            </Button>
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
                <MobileNav open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Button fullWidth variant="text" size="sm" className="">
                            <span>Log In</span>
                        </Button>
                        <Button fullWidth variant="gradient" size="sm" className="">
                            <span>Sign in</span>
                        </Button>
                    </div>
                </MobileNav>
            </Navbar>
        </div>
    );
};

export default NavBar;