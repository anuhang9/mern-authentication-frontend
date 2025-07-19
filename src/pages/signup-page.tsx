import { motion } from 'framer-motion';
import { Input } from '../components/input';
import { Loader, Lock, Mail, User, User2 } from 'lucide-react';
import { Button } from '../components/button';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordStrenghtMeter } from '../components/password-strenght-meter';
import { useState } from 'react';
import { useAuthStore } from '../auth/authStore';

export const Signup =()=>{

const [signupData, setSignupData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: ""
})
const navigate = useNavigate()
const {isLoading, error, signup}=useAuthStore()

const handleChange =(evt: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = evt.target;
    setSignupData((prevValue)=>({...prevValue, [name]: value}))
}
const handleSubmit = async(evt: React.FormEvent)=>{
    evt.preventDefault();
    try{
        await signup(signupData.userName, signupData.fullName, signupData.email, signupData.password)
        navigate("/email-verify")
    }catch(error){
        console.log(error)
    }
}

    return(
        <motion.div initial={{opacity:0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className='max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-sky-600 text-transparent bg-clip-text'>Create An Account</h2>
                <form onSubmit={handleSubmit}>
                    <Input icon={User} type="text" placeholder="Username" name='userName' onChange={handleChange} value={signupData.userName} />
                    <Input icon={User2} type="text" placeholder="Full Name" name='fullName' onChange={handleChange} value={signupData.fullName} />
                    <Input icon={Mail} type="text" placeholder="Email" name='email' onChange={handleChange} value={signupData.email} />
                    <Input icon={Lock} type="password" placeholder="Password" name='password' onChange={handleChange} value={signupData.password} />
                    {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
                    <PasswordStrenghtMeter password={signupData.password}/>
                    <Button type="submit" buttonName={isLoading? <Loader className='mx-auto animate-spin'/>: "Sign Up"} disabled={isLoading}/>
                </form>
            </div>
                <div className='px-8 py-4 bg-gray-900/50 flex justify-center'>
                <p className='text-gray-400'>Already have an account? <Link className='text-blue-400 hover:underline' to={'/login'}>Login</Link></p>
                </div>
        </motion.div>
    )
}