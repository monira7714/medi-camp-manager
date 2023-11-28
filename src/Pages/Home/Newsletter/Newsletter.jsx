import { FaPaperPlane } from 'react-icons/fa';
import Swal from 'sweetalert2'

const Newsletter = () => {

    const handleSubscribe = (e) => {
        e.preventDefault()
        // console.log('success');
        Swal.fire({
            icon: 'success',
            title: 'Congratulations',
            text: 'You have subscribed  successfully',
        })
    }

    return (
        <div className="w-full h-full mx-auto my-8">
            <div className="w-full flex gap-12 items-center flex-col justify-center bg-blue-gray-700 py-8">
                <div className="flex flex-col gap-4 justify-center items-center text-white  md:w-1/3">
                    <img className='w-[30px] h-[30px]' src="https://i.ibb.co/cc0xJVf/newsletter-icon.webp" alt="" />
                    <h2 className="text-xl lg:text-3xl tracking-widest font-medium">Newsletter</h2>
                    <p className="tracking-wide lg:text-lg text-sm">Subscribe to our new posts</p>
                </div>
                <form onSubmit={handleSubscribe} className="flex relative w-2/3 md:pl-20 pl-0 mb-4">
                    <input className="md:px-6 px-4 md:py-3 py-3 md:w-2/3 w-full rounded-full md:text-lg text-sm placeholder:text-black" type="email" name='email' placeholder="Enter Your Email Address" required/>
                    <button className="flex items-center lg:px-12 md:px-6 px-3 md:py-3 py-3 md:text-xl font-semibold rounded-full bg-black text-white absolute lg:right-40 md:right-10 -right-2">
                        <input className='mr-2' type="submit" value="Sign Up"/><FaPaperPlane></FaPaperPlane>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;