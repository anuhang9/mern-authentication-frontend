import { Loader } from "lucide-react"
import { FloatingShape } from "./floating-shape"

export const LoadingComponent =()=>{
    return(
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-800 to-sky-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0}/>
      <FloatingShape color='bg-sky-300' size='w-48 h-48' top='70%' left='80%' delay={5}/>
      <FloatingShape color='bg-indigo-500' size='w-32 h-32' top='40%' left='-10%' delay={2}/>
      <Loader className="size-20 animate-spin text-blue-900"/>
      </div>
    )
}