import { motion } from "framer-motion";
import { Input } from "../components/input";
import { Loader, Lock, User } from "lucide-react";
import { Button } from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuthStore } from "../auth/authStore";

export const Login =()=>{
    const [loginData, setLoginData]= useState({
        userName: "",
        password: ""
    })
    const navigate = useNavigate()
    const {error, isLoading, login} = useAuthStore()
    const handleChange =(evt: ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = evt.target;
        setLoginData((prevValue)=>({...prevValue, [name]: value}))
    }
    const handleSubmit =async(evt: FormEvent)=>{
        evt.preventDefault();
        try{
            await login(loginData.userName, loginData.password)
            navigate('/')
        }catch(error){
            console.log(error)
        }
    }
    return(
        <motion.div initial={{opacity:0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className='max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <div className="p-8">
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-sky-600 text-transparent bg-clip-text'>Welcome</h2>
                <form onSubmit={handleSubmit}>
                    <Input icon={User} type="text" placeholder="Username" name="userName" value={loginData.userName} onChange={handleChange}/>
                    <Input icon={Lock} type="password" placeholder="Password" name="password" value={loginData.password} onChange={handleChange}/>
                    <Link to={'/forgot-password'} className="text-sm text-blue-400 hover:underline pl-3">Forgot password?</Link>
                    {error && <p className="text-red-500 font-semibold mt-2 ml-3">{error}</p>}
                    <Button type="submit" buttonName={isLoading ? <Loader className="mx-auto animate-spin"/> : "Login"} disabled={isLoading}/>
                </form>
            </div>
                <div className='px-8 py-4 bg-gray-900/50 flex justify-center'>
                <p className='text-gray-400'>Don't have an account? <Link className='text-blue-400 hover:underline' to={'/signup'}>Sign Up</Link></p>
                </div>
        </motion.div>
    )
}