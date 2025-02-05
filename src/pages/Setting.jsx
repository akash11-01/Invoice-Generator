import { updateProfile, getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { db } from '../firebas';

export default function Setting() {
    const [profilePic, setProfilePic] = useState(localStorage.getItem('photoURL'))
    const [file, setFile] = useState("");
    const fileRef = useRef();
    const [updateName, setUpdateName] = useState(localStorage.getItem('cName'))
    const [imageUrl, setImageUrl] = useState("")
    // const [authUser, setAuthUser] = useState("")

    const uploadOnCloudinary = async () => {
        if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "Profile_Picture");
            data.append("cloud_name", "dx9vis2rv");

            try {
                const res = await fetch(
                    "https://api.cloudinary.com/v1_1/dx9vis2rv/image/upload",
                    {
                        method: "POST",
                        body: data,
                    }
                );

                const fileUrl = await res.json();
                setImageUrl(fileUrl.url); // Set image URL immediately
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if (!file) return
        uploadOnCloudinary()
    }, [file])

    useEffect(() => {
        if (imageUrl) {
            setProfilePic(imageUrl)
        }
    }, [imageUrl])


    // const getUser = async () => {
    //     const userRef = doc(db, "users", localStorage.getItem('uid'))
    //     const user = await getDoc(userRef)
    //     if (user.exists()) {
    //         return user.data();
    //     } else {
    //         return null
    //     }
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        const user = auth.currentUser;
        // console.log(user)
        if (user) {
            try {
                await updateProfile(user, {
                    displayName: updateName,
                    photoURL: profilePic
                });

                // saving the updated data into firestore database
                await setDoc(doc(db, "users", user.uid), {
                    displayName: updateName,
                    photoURL: profilePic,
                });
                localStorage.setItem('photoURL', profilePic)
                localStorage.setItem('cName', updateName)
            } catch (error) {
                console.log(error)
            }
        }
    }
    // console.log(authUser)

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className="h-[60%] w-[40%] bg-white flex flex-col gap-2">
                <p className='text-2xl font-semibold m-3 text-center'>Update Profile</p>
                <form className='flex flex-col gap-3 items-center' onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        ref={fileRef} hidden
                    />
                    <img
                        src={profilePic}
                        onClick={() => fileRef.current.click()}
                        className='w-32 h-32 rounded-full cursor-pointer' alt=""
                    />
                    <input
                        type="text"
                        onChange={(e) => setUpdateName(e.target.value)}
                        value={updateName}
                        placeholder='Enter your name here'
                        className='border p-2 rounded-md w-[80%]'
                    />
                    <button type='submit' className='border bg-slate-600 p-2 text-lg font-bold text-white w-[80%] rounded-md'>Update Name</button>
                </form>

            </div>
        </div>
    )
}
