import { motion } from "framer-motion"
import { Input } from "../components/input"
import { Button } from "../components/button"
import { Lock } from "lucide-react"
import { useState, type FormEvent } from "react"
import { useAuthStore } from "../auth/authStore"
import { useNavigate, useParams } from "react-router-dom"

export const ResetPassword =()=>{

    const [resetNewPassword, setResetNewPassword] = useState("");
    const [reEnterPassword, setreEnterPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const { resetPassword, isLoading, error} = useAuthStore()
    const {token} = useParams()
    const navigate = useNavigate()

    
    console.log(resetNewPassword)
    
    const handleSubmit =async(evt: FormEvent)=>{
        evt.preventDefault();
        if(resetNewPassword !== reEnterPassword){
            setPasswordError("password doesn't match.")
            return;
        }
        console.log(resetNewPassword)
        try{
            if(!token){
                setPasswordError("Invalid token.")
                return
            }
            await resetPassword(resetNewPassword, token)
            navigate('/login')
        }catch(error){
            console.log(error)
        }
    }

    if (!token) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-red-500">Invalid Token</h2>
          <p className="text-gray-300">The password reset link is invalid or has expired. Please request a new one.</p>
          <Button type="button" onClick={() => navigate("/forgot-password")} buttonName="Request New Link" />
        </div>
      </motion.div>
    );
  }

    return(
        <motion.div initial={{opacity:0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className='max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <div className="p-8">
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-sky-600 text-transparent bg-clip-text'>Password</h2>
                <p className="text-center text-gray-300 mb-6">Enter the new password and keep your password safe.</p>
                <form onSubmit={handleSubmit}>
                    <Input icon={Lock} type="password" placeholder="New Password" value={resetNewPassword} onChange={(evt)=>setResetNewPassword(evt.target.value)} name="resetPassword"/>
                    <Input icon={Lock} type="password" value={reEnterPassword} onChange={(evt)=>
                        setreEnterPassword(evt.target.value)} placeholder="Conform Your Password" name="resetPassword"/>
                    <p className="text-red-500 font-semibold mt-2 ml-3">{passwordError}</p>
                    {error && <p className="text-red-500 font-semibold mt-2 ml-3">{error}</p>}
                    <Button disabled={isLoading} type="submit" buttonName="Enter"/>
                </form>
            </div>
        </motion.div>
    )
}