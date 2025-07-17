import { motion } from 'framer-motion';
import { Input } from '../components/input';
import { Lock, Mail, User, User2 } from 'lucide-react';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';

export const Signup =()=>{
    return(
        <motion.div initial={{opacity:0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className='max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <div className='p-8'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-sky-600 text-transparent bg-clip-text'>Create An Account</h2>
                <form>
                    <Input icon={User} type="text" placeholder="Username" name='userName'/>
                    <Input icon={User2} type="text" placeholder="Full Name" name='fullName'/>
                    <Input icon={Mail} type="text" placeholder="Email" name='email'/>
                    <Input icon={Lock} type="password" placeholder="Password" name='password'/>
                    <Button type="submit" buttonName="Submit"/>
                </form>
            </div>
                <div className='px-8 py-4 bg-gray-900/50 flex justify-center'>
                <p className='text-gray-400'>Already have an account? <Link className='text-blue-400 hover:underline' to={'/login'}>Login</Link></p>
                </div>
        </motion.div>
    )
}