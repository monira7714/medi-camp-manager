import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';
import {FaLocationDot, FaMessage, FaPhone } from "react-icons/fa6";
const ContactUs = () => {
    const position = [22.3752, 91.8349];
    // 22.3752° N, 91.8349° E
    // const styles = {
    //     container: {
      
    //       // Media queries for different device sizes
    //       '@media (min-width: 960px)': {
    //         width:''
    //       },
    //       '@media (min-width: 768px) and (max-width: 1199px)': {
    //         backgroundColor: 'lightcoral',
    //       },
    //       '@media (max-width: 767px)': {
    //         backgroundColor: 'lightpink',
    //       },
    //     },
    //   };
    // style={{ height: '400px', width: '350px' }}
    return (
        <div >
             <MapContainer className="lg:mx-96 md:mx-20 my-12 w-[350px] md:w-[600px] mx-auto lg:h-[500px] h-[300px]"  center={position} zoom={13} scrollWheelZoom={false} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        Here you found us!
                    </Popup>
                </Marker>
            </MapContainer>
            <div className="bg-blue-800 text-white flex flex-row gap-4 items-center justify-around px-12 py-12">
                <div className="flex flex-col gap-3 items-center justify-center">
                    <FaLocationDot className="text-2xl"></FaLocationDot>
                    <h1 className="text-2xl font-semibold">Address</h1>
                    <h3 className="text-xl font-semibold underline">Head Quarter</h3>
                    <p>104/A,Mia Khan Road, Halishohor, Chattogram</p>
                    <h3 className="text-xl font-medium underline">Local Branch</h3>
                    <p>104/A,Mia Khan Road, Halishohor, Chattogram</p>
                </div>
                <div className="flex flex-col gap-3 items-center justify-center">
                    <FaPhone className="text-2xl"></FaPhone>
                    <h1 className="text-2xl font-semibold">Phone</h1>
                    <h3 className="text-xl font-semibold underline">Head Quarter</h3>
                    <p>+8801990866713</p>
                    <h3 className="text-xl font-medium underline">Local Branch</h3>
                    <p>+8801980317714</p>
                </div>
                <div className="flex flex-col gap-3 items-center justify-center">
                    <FaMessage className="text-2xl"></FaMessage>
                    <h1 className="text-2xl font-semibold">Email</h1>
                    <h3 className="text-xl font-semibold underline">For all queries</h3>
                    <p>mediCampManager@gmail.com</p>
                    <h3 className="text-xl font-medium underline">For customer support</h3>
                    <p>support@mediCampManager.com</p>
                </div>
            </div>
           
        </div>
    );
};

export default ContactUs;