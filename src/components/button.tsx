import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<typeof motion.button>{
    buttonName: ReactNode | string,
    type: "submit" | "button" | "reset",
}

export const Button =({buttonName, ...props}: ButtonProps)=>{
    return(
        <motion.button className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-sky-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 cursor-pointer" {...props} whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>{buttonName}</motion.button>
    )
}