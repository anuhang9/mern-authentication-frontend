import { motion } from 'framer-motion'

interface FloatingShapeProps{
    color: string,
    size: string,
    top: string,
    left: string,
    delay: number
}

export const FloatingShape =({color, size, top, left, delay}: FloatingShapeProps)=>{
    return(
        <motion.div animate={{y: ["0%", "100%", "0%"], x: ["0%", "100%", "0%"]}} transition={{duration: 20, ease: "linear", repeat: Infinity, delay}} style={{top, left}} aria-hidden="true" className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}></motion.div>
    )
}