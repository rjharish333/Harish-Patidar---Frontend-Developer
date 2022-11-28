import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import ErrorMessage from '../common/ErrorMessage';
import { setSignIn } from '../redux/slices/authSlice';
import { Alert } from '../services/NotiflixService';
import AuthService from './../services/AuthService';

// Login component
const Login = () => {

    const [loading, setLoading] = useState(false)
    const [btnText, setBtnText] = useState("Login")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const dispatch  = useDispatch();
  
    const handleLogin = async() => {

        if(!email)
        {
            setEmailError(true);
            setTimeout(() => {
                setEmailError(false);
            }, 3000);
            return
        }

        if(!password)
        {
            setPasswordError(true);
            setTimeout(() => {
                setPasswordError(false);
            }, 3000);
            return
        }

        try{
            setLoading(true);
            setBtnText("Processing...")

            const _data = {email, password}

            let _resp = await AuthService.login(_data);
            if(_resp.status === 'failure')
            {
              Alert.error(_resp.message)
              return;
            }
            Alert.success(_resp.message)
            const _auth = {isLoggedIn: true, jwtToken: _resp.data.token}
            dispatch(setSignIn(_auth))
          }
          catch(err)
          {
            Alert.error(err.message)
          }
          finally{
            setBtnText("Login")
            setLoading(false);
          }
    }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase decoration-wavy">
                Sign in
            </h1>

            <h5 className='mt-8'>Login Credentials -  <b>Email:</b> user@spacex.com <b>Password:</b> @123@123 </h5>
            <form className="mt-6">
                <div className="mb-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        onChange={(e)=>setEmail(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {emailError && <ErrorMessage message="Email field is required" />}
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {passwordError && <ErrorMessage message="Password field is required" />}
                </div>
                <div className="mt-6">
                    <button type='button' onClick={handleLogin} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                        {btnText}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login