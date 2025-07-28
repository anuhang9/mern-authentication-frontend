import { motion } from "framer-motion";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useAuthStore } from "../auth/authStore";
import { Link } from "react-router-dom";
export const MsgResetPassword =()=>{

    const [email, setEmail] = useState("");
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const {isLoading, error, forgetpassword} = useAuthStore()

    const handleSubmit = async(evt: FormEvent)=>{
        evt.preventDefault();
        try{
            await forgetpassword(email);
            setIsSubmit(true);
        }catch(error){
            console.log(error);
        }
    }
	console.log(isSubmit)
    return(
        <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-sky-600 text-transparent bg-clip-text'>
					Forgot Password
				</h2>
					<div className='text-center'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
							className='w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4'
						>
							<Mail className='h-8 w-8 text-white' />
						</motion.div>
						<p className='text-gray-300 mb-6'>
							If an account exists, you will receive a password reset link in your email.
						</p>
					</div>
			</div>

			<div className='px-8 py-4 bg-gray-900/50 flex justify-center'>
				<Link to={"/login"} className='text-sm text-blue-400 hover:underline flex items-center'>
					<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
				</Link>
			</div>
		</motion.div>
    )
}