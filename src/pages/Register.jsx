import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebas'
import { doc, setDoc } from 'firebase/firestore'

export default function Login() {
    const fileRef = useRef(null)
    const [formdata, setFormdata] = useState([])
    const [file, setFile] = useState([])

    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.id]: e.target.value
        })
    }

    const uploadOnCloudinary = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Profile_Picture");
        data.append("cloud_name", "dx9vis2rv")

        const res = await fetch("https://api.cloudinary.com/v1_1/dx9vis2rv/image/upload", {
            method: "POST",
            body: data
        })

        const fileUrl = await res.json()
        return fileUrl.url
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let uploadedFileURL = "";
        if (file !== undefined) {
            uploadedFileURL = await uploadOnCloudinary();
        }
        createUserWithEmailAndPassword(auth, formdata.email, formdata.password)
            .then((newUser) => {
                updateProfile(newUser.user, {
                    displayName: formdata.name,
                    photoURL: uploadedFileURL,
                })
                // console.log(newUser)


                //setting the database.
                //users -> collection name
                setDoc(doc(db, "users", newUser.user.uid), {
                    uid: newUser.user.uid,  //these things will be stored in the database.
                    displayName: formdata.name,
                    email: formdata.email,
                    photoURL: uploadedFileURL
                })
                navigate('/dashboard')

            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='h-screen flex justify-center items-center '>
            <div className=' h-[70%] w-[85%] md:h-[70%] md:w-[60%] flex'>
                <div className="h-full w-1/2 overflow-hidden">
                    <img src="https://th.bing.com/th/id/OIP.Xtc6wFSNX6o6orpxxNLEZgHaHa?rs=1&pid=ImgDetMain" alt=""
                        className='w-full h-full'
                    />
                </div>
                <div className="w-1/2">
                    <div className='h-full flex flex-col items-center justify-center'>
                        <h1 className='text-center mb-6  text-3xl font-bold'>Register</h1>
                        <div className='w-full'>
                            <form onSubmit={submitHandler} className='flex flex-col gap-2'>
                                <input
                                    type="text"
                                    placeholder='Name'
                                    className='border p-3 ml-3 mr-3 rounded-md'
                                    id='name'
                                    onChange={handleChange}
                                />

                                <input
                                    type="email"
                                    placeholder='Email'
                                    className='border p-3 ml-3 mr-3 rounded-md'
                                    id='email'
                                    onChange={handleChange}
                                />

                                <input
                                    type="password"
                                    placeholder='Password'
                                    className='border p-3 ml-3 mr-3 rounded-md'
                                    id='password'
                                    onChange={handleChange}
                                />

                                <input
                                    type="file"
                                    placeholder='avatar'
                                    ref={fileRef}
                                    hidden
                                    accept='image/'
                                    id='image'
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <button type='button' onClick={() => fileRef.current.click()} className='border p-3 ml-3 mr-3 rounded-lg'>upload image</button>

                                <button type='submit' className='bg-green-700 p-3 ml-3 mr-3 rounded-lg hover:opacity-90 text-lg'>signup</button>

                                <Link to={'/login'} className='text-center hover:underline'>
                                    Already have an account
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
