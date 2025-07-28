import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { FloatingShape } from './components/floating-shape'
import { Home } from './pages/home-page'
import { Signup } from './pages/signup-page'
import { EmailVerify } from './pages/email-verify'
import { Login } from './pages/login-page'
import { ResetPassword } from './pages/reset-password'
import { ForgetPassword } from './pages/forget-password'
import { useAuthStore } from './auth/authStore'
import { useEffect, type ReactNode } from 'react'
import { LoadingComponent } from './components/loading'
import { MsgResetPassword } from './pages/msg-reset-password'

function App() {
  
  const {checkauth, isCheckingAuth} = useAuthStore();
  const ProtectRoute =({children}: {children: ReactNode})=>{
    const {isAuthenticated, user} = useAuthStore();
    if(!isAuthenticated){
      return <Navigate to='/login' replace/>
    }
    if(user && !user.isVerified){
      return <Navigate to="/email-verify" replace/>
    }
    return children;
  }
  
  const RedirectAuthenticatedUser =({children}: {children: ReactNode})=>{
    const {isAuthenticated, user} = useAuthStore()
    // console.log(isAuthenticated, user?.isVerified) 
    if(isAuthenticated && user?.isVerified){
      return <Navigate to='/' replace />;
    }
    return children;
  }

  useEffect(()=>{
    checkauth()
  },[checkauth]);

  if(isCheckingAuth){
    return <LoadingComponent/>
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-800 to-sky-900 flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color='bg-blue-500' size='w-64 h-64' top='-5%' left='10%' delay={0}/>
      <FloatingShape color='bg-sky-300' size='w-48 h-48' top='70%' left='80%' delay={5}/>
      <FloatingShape color='bg-indigo-500' size='w-32 h-32' top='40%' left='-10%' delay={2}/>
      <Routes>
        <Route path='/' element={
          <ProtectRoute>
              <Home/>
          </ProtectRoute>
          }/>
        <Route path='/signup' element={
          <RedirectAuthenticatedUser>
            <Signup/>
          </RedirectAuthenticatedUser>
          }/>
        <Route path='/email-verify' element={
          <RedirectAuthenticatedUser>
            <EmailVerify/>
          </RedirectAuthenticatedUser>
          }/>
        <Route path='/login' element={
          <RedirectAuthenticatedUser>
            <Login/>
          </RedirectAuthenticatedUser>
          }/>
        <Route path='/forgot-password' element={
          <RedirectAuthenticatedUser>
            <ForgetPassword/>
          </RedirectAuthenticatedUser>
          }/>
          <Route path='/thankyou' element={
            <RedirectAuthenticatedUser>
              <MsgResetPassword/>
            </RedirectAuthenticatedUser>
          }/>
        <Route path='/reset-password/:token' element={
          <RedirectAuthenticatedUser>
            <ResetPassword/>
          </RedirectAuthenticatedUser>
          }/>
      </Routes>
    </div>
  )
}

export default App
