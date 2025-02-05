import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebas";
import { doc, setDoc } from "firebase/firestore";

export default function Login() {
    const fileRef = useRef(null);
    const [formdata, setFormdata] = useState({});
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const handleChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.id]: e.target.value,
        });
    };

    const uploadOnCloudinary = async () => {
        if (!file) return null; // Prevent upload if no file is selected

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
            return fileUrl.url;
        } catch (error) {
            console.error("Cloudinary Upload Error:", error);
            setError("Image upload failed. Try again.");
            return null;
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        let uploadedFileURL = "";
        if (file) {
            uploadedFileURL = await uploadOnCloudinary();
            if (!uploadedFileURL) return; // Stop if upload fails
        }

        createUserWithEmailAndPassword(auth, formdata.email, formdata.password)
            .then(async (newUser) => {
                await updateProfile(newUser.user, {
                    displayName: formdata.name,
                    photoURL: uploadedFileURL,
                });

                await setDoc(doc(db, "users", newUser.user.uid), {
                    uid: newUser.user.uid,
                    displayName: formdata.name,
                    email: formdata.email,
                    photoURL: uploadedFileURL,
                });

                localStorage.setItem("cName", newUser.user.displayName);
                localStorage.setItem("photoURL", newUser.user.photoURL);
                localStorage.setItem("email", newUser.user.email);
                localStorage.setItem("uid", newUser.user.uid)

                setError("");
                navigate("/dashboard");
            })
            .catch((err) => {
                setError(err.message);
                console.log(err);
            });
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="h-[70%] w-[85%] md:h-[70%] md:w-[60%] flex">
                <div className="h-full w-1/2 overflow-hidden">
                    <img
                        src="https://th.bing.com/th/id/OIP.Xtc6wFSNX6o6orpxxNLEZgHaHa?rs=1&pid=ImgDetMain"
                        alt=""
                        className="w-full h-full"
                    />
                </div>
                <div className="w-1/2">
                    <div className="h-full flex flex-col items-center justify-center">
                        <h1 className="text-center mb-6 text-3xl font-bold">Register</h1>
                        <div className="w-full">
                            <form onSubmit={submitHandler} className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="border p-3 ml-3 mr-3 rounded-md"
                                    id="name"
                                    onChange={handleChange}
                                />

                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="border p-3 ml-3 mr-3 rounded-md"
                                    id="email"
                                    onChange={handleChange}
                                />

                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="border p-3 ml-3 mr-3 rounded-md"
                                    id="password"
                                    onChange={handleChange}
                                />

                                <input
                                    type="file"
                                    placeholder="avatar"
                                    ref={fileRef}
                                    hidden
                                    accept="image/*"
                                    id="image"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                                <button
                                    type="button"
                                    onClick={() => fileRef.current.click()}
                                    className="border p-3 ml-3 mr-3 rounded-lg"
                                >
                                    Upload Image
                                </button>

                                {/* Show uploaded image preview */}
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt="Uploaded Preview"
                                        className="w-20 h-20 rounded-full mx-auto mt-2"
                                    />
                                )}

                                <button
                                    type="submit"
                                    className="bg-green-700 p-3 ml-3 mr-3 rounded-lg hover:opacity-90 text-lg"
                                >
                                    Sign Up
                                </button>

                                <Link to={"/login"} className="text-center hover:underline text-lg m-2">
                                    Already have an account?
                                </Link>
                            </form>
                            {error && <div className="text-red-600 font-bold text-center">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
