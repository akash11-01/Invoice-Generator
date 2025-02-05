import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebas';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
                // console.log(user)
                localStorage.setItem('cName', user.displayName);
                localStorage.setItem('photoURL', user.photoURL);
                localStorage.setItem('email', user.email);
                localStorage.setItem('uid', user.uid)
                setLoading(false)
                navigate('/dashboard')
            })
            .catch((err) => {
                setLoading(false)
                setError(err.message)
                console.log(err)
            })
    }
    return (
        <div className='h-screen flex justify-center items-center '>
            <div className='h-[70%] w-[85%] md:h-[70%] md:w-[70%] flex'>
                <div className="h-full w-1/2 overflow-hidden">
                    <img src="https://th.bing.com/th/id/OIP.Xtc6wFSNX6o6orpxxNLEZgHaHa?rs=1&pid=ImgDetMain" alt=""
                        className='w-full h-full'
                    />
                </div>
                <div className="w-1/2">
                    <div className='h-full flex flex-col items-center justify-center'>
                        <h1 className='text-center mt-[-100px] mb-6 text-3xl font-bold'>Login Form</h1>
                        <div className='w-full'>
                            <form onSubmit={submitHandler} className='flex flex-col gap-4'>
                                <input
                                    type="email"
                                    placeholder='Email'
                                    className='border p-3 ml-3 mr-3 rounded-md'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder='Password'
                                    className='border p-3 ml-3 mr-3 rounded-md'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {
                                    !loading ? <button
                                        type='submit'
                                        className='bg-green-700 p-3 mt-5 ml-3 mr-3 rounded-lg hover:opacity-90 text-lg'>
                                        Login
                                    </button> : (
                                        <div className="text-center font-semibold text-lg">Loading..</div>
                                    )
                                }
                                <Link to={'/register'} className='text-center hover:underline text-lg mb-3'>
                                    create account
                                </Link>
                            </form>
                            {error &&
                                <div className="text-red-600 font-bold text-center">{error}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
