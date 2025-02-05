import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth';
import { FaFileInvoice, FaHome } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { TbFileInvoice } from 'react-icons/tb';

export default function Dashboard() {

    const navigate = useNavigate();

    const handleLogOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            localStorage.clear();
            navigate('/')
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        const user = localStorage.getItem('uid');
        if (user == null) {
            navigate('/')
        }
    }, [])

    return (
        <div className='flex'>
            <div className="bg-slate-800 h-screen w-[22%]">
                <div className='h-[11%] w-full flex justify-around items-center gap-2 border-b-2'>
                    <img src={localStorage.getItem('photoURL')} alt="profile-pic"
                        className='h-16 w-16 rounded-full '
                    />
                    <div className="flex flex-col gap-2">
                        <h1 className='text-white'>{localStorage.getItem('cName')}</h1>
                        <button onClick={handleLogOut} className='bg-white p-1 rounded-md'>Logout</button>
                    </div>
                </div>
                <div className='flex flex-col gap-4 mt-3 text-white ml-2'>
                    <Link to={''}>
                        <div className="flex items-center gap-2 ml-1">
                            <FaHome />
                            <p>Home</p>
                        </div>
                    </Link>
                    <Link to={'invoices'}>
                        <div className="flex items-center gap-2 ml-1">
                            <TbFileInvoice />
                            <p>Invoice</p>
                        </div>
                    </Link>
                    <Link to={'new-invoice'}>
                        <div className="flex items-center gap-2 ml-1">
                            <FaFileInvoice />
                            <p>New invoice</p>
                        </div>
                    </Link>
                    <Link to={'setting'}>
                        <div className="flex items-center gap-2 ml-1">
                            <IoSettings />
                            <p>Settings</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="bg-slate-100 h-screen w-[80%]">
                <Outlet />
            </div>
        </div>
    )
}
