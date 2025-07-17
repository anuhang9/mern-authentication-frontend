import { Route, Routes } from 'react-router-dom'
import './App.css'
import { FloatingShape } from './components/floating-shape'
import { Home } from './pages/home-page'
import { Signup } from './pages/signup-page'
import { EmailVerify } from './pages/email-verify'
import { Login } from './pages/login-page'
import { ResetPassword } from './pages/reset-password'

function App() {

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-800 to-sky-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0}/>
      <FloatingShape color='bg-sky-300' size='w-48 h-48' top='70%' left='80%' delay={5}/>
      <FloatingShape color='bg-indigo-500' size='w-32 h-32' top='40%' left='-10%' delay={2}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default App
