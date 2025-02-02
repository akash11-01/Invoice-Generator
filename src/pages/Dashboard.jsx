import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div className='flex'>
            <div className="bg-slate-800 h-screen w-[22%]">
                <div className='h-[11%] w-full flex justify-evenly items-center gap-2 border-b-2'>
                    <img src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg" alt="profile-pic"
                        className='h-16 w-16 rounded-full '
                    />
                    <div className="flex flex-col gap-2">
                        <h1 className='text-white'>Name</h1>
                        <button className='bg-white p-1 rounded-md'>Logout</button>
                    </div>
                </div>
                <div className='flex flex-col gap-4 mt-3 text-white ml-2'>
                    <Link to={''}>
                        Home
                    </Link>
                    <Link to={'invoices'}>
                        Invoices
                    </Link>
                    <Link to={'new-invoice'}>
                        New Invoice
                    </Link>
                    <Link to={'setting'}>
                        Setting
                    </Link>
                </div>
            </div>
            <div className="bg-slate-100 h-screen w-[80%]">
                <Outlet />
            </div>
        </div>
    )
}
