import { motion } from "framer-motion";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { Mail } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuthStore } from "../auth/authStore";
import { useNavigate } from "react-router-dom";

export const ForgetPassword =()=>{
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    const {isLoading, error, forgetpassword} = useAuthStore()

    const handleChange=(evt: ChangeEvent<HTMLInputElement>)=>{
        setEmail(evt.target.value)
    }
    const handleSubmit = async(evt: FormEvent)=>{
        evt.preventDefault();
        try{
            await forgetpassword(email)
            navigate('/reset-password')
        }catch(error){
            console.log(error)
        }
    }
    return(
        <motion.div initial={{opacity:0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className='max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <div className="p-8">
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-sky-600 text-transparent bg-clip-text'>Email</h2>
                <p className="text-center text-gray-300 mb-6">Enter the email to reacover your password.</p>
                <form onSubmit={handleSubmit}>
                    <Input icon={Mail} type="text" placeholder="Email" name="email" onChange={handleChange} value={email}/>
                    <Button type="submit" buttonName="Enter"/>
                </form>
            </div>
        </motion.div>
    )
}