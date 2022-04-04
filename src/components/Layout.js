import { useState, memo } from 'react'
import { useSelector } from 'react-redux'
import Main from './Main'
import { Header } from './Header'
import { Footer } from './Footer'
import { Login } from './Login'
import { SignUp } from './SignUp'
import {
  selectIsAuthentication,
  selectIsSignUp,
} from '../features/auth/authSlice'

const Layout = memo(() => {
  const isLogin = useSelector(selectIsAuthentication)
  const isSignUp = useSelector(selectIsSignUp)
  const [user, setUser] = useState({
    name: 'taro',
    email: 'taro@example.com',
    password: 'abcd',
  })
  return (
    <div className="flex items-center flex-col min-h-screen text-gray-600 font-mono">
      <Header />
      <div className="flex justify-center items-center w-screen flex-1">
        {isLogin ? (
          <Main />
        ) : isSignUp ? (
          <SignUp user={user} setUser={setUser} />
        ) : (
          <Login user={user} setUser={setUser} />
        )}
      </div>
      <Footer />
    </div>
  )
})

export default Layout
