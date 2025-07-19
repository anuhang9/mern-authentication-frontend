import { motion } from "framer-motion"
import { Input } from "../components/input"
import { Button } from "../components/button"
import { Lock } from "lucide-react"
import { PasswordStrenghtMeter } from "../components/password-strenght-meter"

export const ResetPassword =()=>{
    return(
        <motion.div initial={{opacity:0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className='max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <div className="p-8">
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-sky-600 text-transparent bg-clip-text'>Password</h2>
                <p className="text-center text-gray-300 mb-6">Enter the new password and keep your password safe.</p>
                <form>
                    <Input icon={Lock} type="password" placeholder="New Password" name="resetPassword"/>
                    <Input icon={Lock} type="password" placeholder="Conform Your Password" name="resetPassword"/>
                    <PasswordStrenghtMeter password="nepal"/>
                    <Button type="submit" buttonName="Enter"/>
                </form>
            </div>
        </motion.div>
    )
}