import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/button";
import { useAuthStore } from "../auth/authStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

export const EmailVerify =()=>{
    const [otpCode, setOtpCode] = useState<string[]>(['', '', '', '', '']);
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();
    const {error, isLoading, emailverify} = useAuthStore()

    const handleChange = (index: number, value:string)=>{
        if(!/^\d*$/.test(value))return;
        const newOtpCode = [...otpCode];
        if(value.length>1){
            const pastedOtpCode = value.slice(0, 5).split("");
            for(let i = 0; i<5; i++){
                newOtpCode[i] = pastedOtpCode[i] || '';
            }
            setOtpCode(newOtpCode);
        }
        else{
            newOtpCode[index] = value;
            setOtpCode(newOtpCode);
            if(value && index<5){ 
                inputRef.current[index+1]?.focus();
            }
        }
    };
    
    const handleKeyDown = (index: number, evt: React.KeyboardEvent<HTMLInputElement>)=>{
        if(evt.key === "Backspace" && !otpCode[index] && index > 0){
            inputRef.current[index-1]?.focus();
        }
    };
    const handleSubmit =async(evt?: React.FormEvent)=>{
        if(evt){
            evt.preventDefault();
        }
        const verificationCode = otpCode.join("");
        try{
            await emailverify(verificationCode);
            navigate("/")
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        if(otpCode.every(digit=> digit !== "")){
            handleSubmit()
        }
    },[otpCode])
    return(
        <div className='max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <motion.div initial={{opacity:0, y: -50}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}} className='p-8 max-w-md w-full bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-sky-600 text-transparent bg-clip-text'>Verify Your Email</h2>
                <p className="text-center text-gray-300 mb-6">Enter the 5-digit code sent to your email address.</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                        {otpCode.map((digit, index)=>(
                            <input type="text" key={index} maxLength={5} ref={(element)=>{inputRef.current[index] = element}} value={digit} onChange={(evt)=> handleChange(index, evt.target.value)} onKeyDown={(evt)=>handleKeyDown(index, evt)} className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-gray-600 rounded-lg focus:border focus:border-blue-500 focus:outline-none"/>
                        ))}
                    </div>
                    {error && <p className="text-red-500 font-semibold mb-1 ml-2">{error}</p>}
                    <Button type="submit" disabled={isLoading} buttonName={isLoading ? <Loader className="mx-auto animate-spin"/> : "verify"}/>
                </form>
            </motion.div>
        </div>
    )
}