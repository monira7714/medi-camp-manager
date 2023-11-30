import { NavLink, Outlet } from "react-router-dom";
// import useAdmin from "../Hooks/useAdmin";
import { FaBook, FaCalendar, FaCampground, FaEnvelope, FaList, FaUsers, FaUtensils } from "react-icons/fa6";
import { FaAd, FaHome, FaShoppingCart } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    console.log(isAdmin);
    // const isAdmin = true;
    return (
        <div className="flex">
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div className="w-60 py-10 px-6 min-h-screen bg-purple-400 text-white">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <div className="flex flex-col justify-center space-y-3">
                                <li>
                                    <NavLink to="/dashboard/adminHome">
                                        <h3 className="flex items-center gap-2">
                                            <FaHome></FaHome>
                                            Admin Home
                                        </h3>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-a-camp">
                                        <h3 className="flex items-center gap-2">
                                            <FaUtensils></FaUtensils>
                                            Add A Camp
                                        </h3>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageItems">
                                        <h3 className="flex items-center gap-2">
                                            <FaList></FaList>
                                            Manage Items
                                        </h3>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <h3 className="flex items-center gap-2">
                                            <FaBook></FaBook>
                                            Manage Bookings
                                        </h3>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/allUsers">
                                        <h3 className="flex items-center gap-2">
                                            <FaUsers></FaUsers>
                                            All Users
                                        </h3>
                                    </NavLink>
                                </li>
                            </div>
                            :
                            <div className="flex flex-col justify-center space-y-3">
                                <li >
                                    <NavLink to="/dashboard/userHome">
                                        <h3 className="flex items-center gap-2">
                                            <FaHome></FaHome>
                                            User Home
                                        </h3>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/history">
                                        <h3 className="flex items-center gap-2">
                                            <FaCalendar></FaCalendar>
                                            Not History
                                        </h3>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <h3 className="flex items-center gap-2">
                                            <FaShoppingCart></FaShoppingCart>
                                            My Cart
                                        </h3>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <h3 className="flex items-center gap-2">
                                            <FaAd></FaAd>
                                            Add a Review
                                        </h3>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory">
                                        <h3 className="flex items-center gap-2">
                                            <FaList></FaList>
                                            Real Payment History
                                        </h3>
                                    </NavLink>
                                </li>
                            </div>
                    }
                    <hr className="h-2 my-12" />
                    <div className="space-y-3">
                        <li>
                            <NavLink to="/">
                                <h3 className="flex items-center gap-2">
                                    <FaHome></FaHome>
                                    Home
                                </h3>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/availableCamps">
                                <h3 className="flex items-center gap-2">
                                    <FaCampground></FaCampground>
                                    AvailableCamps
                                </h3>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contactUs">
                                <h3 className="flex items-center gap-2">
                                    <FaEnvelope></FaEnvelope>
                                    Contact Us
                                </h3>
                            </NavLink>
                        </li>
                    </div>
                </ul>
            </div>
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;