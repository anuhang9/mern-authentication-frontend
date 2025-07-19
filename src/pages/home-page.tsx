import { useAuthStore } from "../auth/authStore";
import { motion } from "framer-motion";

export const Home =()=>{
    const {logout, user} = useAuthStore()

    const handleLogout=()=>{
        logout();
    }
    return(
        <motion.div initial={{opacity:0, scale: 0.9}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.5}} exit={{opacity: 0, scale: 0.9}} className='max-w-md w-full mx-auto mt-10 p-8 border-gray-800 bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-sky-600 text-transparent bg-clip-text'>Dashboard</h2>
            <div className="space-y-6">
                 <motion.div initial={{opacity:0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className='p-4 bg-gray-800/50 rounded-lg border-gray-700'>
                 <h3 className="text-xl font-semibold text-blue-400 mb-3">Profile Infromation</h3>
                 <p className="text-gray-300">Name: {user?.fullName}</p>
                 <p className="text-gray-300">User Name: {user?.userName}</p>
                 <p className="text-gray-300">Email: {user?.email}</p>
                 </motion.div>
                 <motion.div initial={{opacity:0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className='p-4 bg-gray-800/50 rounded-lg border-gray-700'>
                 <h3 className="text-xl font-semibold text-blue-400 mb-3">Accoutn Activity</h3>
                 <p className="text-gray-300">Last Log in: ------</p>
                 <p className="text-gray-300">Joined: ____</p>
                 </motion.div>
            </div>
            <motion.button className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-sky-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 cursor-pointer" onClick={handleLogout} whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>Logout</motion.button>
        </motion.div>
    )
}