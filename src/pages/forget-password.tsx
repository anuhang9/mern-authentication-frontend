import { motion } from "framer-motion";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useAuthStore } from "../auth/authStore";
import { Link, useNavigate } from "react-router-dom";
export const ForgetPassword =()=>{

    const [email, setEmail] = useState("");
    const {isLoading, error, forgetpassword} = useAuthStore();
	const navigate = useNavigate()

    const handleSubmit = async(evt: FormEvent)=>{
        evt.preventDefault();
        try{
            await forgetpassword(email);
			navigate("/thankyou")
        }catch(error){
            console.log(error);
        }
    }
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
					<form onSubmit={handleSubmit}>
						<p className='text-gray-300 mb-6 text-center'>
							Enter your email address and we'll send you a link to reset your password.
						</p>
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(evt)=>{setEmail(evt.target.value)}}
                            name="email"
						/>
                        {error && <p className="text-red-500 font-semibold mt-2 ml-3">{error}</p>}
						<Button type="submit" disabled={isLoading} buttonName={isLoading ? <Loader className="animate-spin mx-auto"/>:"Send Reset Link"}/>
					</form>
			</div>

			<div className='px-8 py-4 bg-gray-900/50 flex justify-center'>
				<Link to={"/login"} className='text-sm text-blue-400 hover:underline flex items-center'>
					<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
				</Link>
			</div>
		</motion.div>
    )
}