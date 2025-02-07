import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebas';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';

export default function Invoices() {
    const [invoices, setInvoices] = useState([])
    const navigate = useNavigate();
    const [invoiceLoading, setInvoiceLoading] = useState(false)

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        setInvoiceLoading(true)
        const q = query(collection(db, "invoice"), where('uid', "==", localStorage.getItem('uid'))) // filtering the invoice og particular user
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() //Har ek document ka data
        }))
        setInvoices(data)
        setInvoiceLoading(false)
    }

    const deleteInvoice = async (id) => {
        const isSure = window.confirm("Are you sure want to Delete this ?") //* this will be either true or false.
        if (isSure) {
            try {
                await deleteDoc(doc(db, "invoice", id))
                getData();
            } catch (error) {
                console.log("Something went wrong")
            }
        }
    }
    return (
        <div>
            {!invoiceLoading ? invoices.length > 0 ? invoices.map(data => (
                <div key={data.id} className='flex justify-between items-center border p-3 bg-slate-50 m-2'>
                    <p>{data.to}</p>
                    <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
                    <p>{data.Total}</p>
                    <div className="flex gap-5">
                        <button onClick={() => { deleteInvoice(data.id) }} className='bg-red-500 p-2 rounded-md text-white hover:opacity-85'>
                            <div className="flex gap-2 items-center">
                                <p>Delete</p>
                                <MdDelete />
                            </div>
                        </button>
                        <button onClick={() => navigate('/dashboard/invoice-details', { state: data })} className='p-2 rounded-md bg-purple-800 text-white hover:opacity-85' >
                            <div className="flex gap-2 items-center">
                                <p>View</p>
                                <FaEye />
                            </div>
                        </button>
                    </div>
                </div>
            )) : (
                <div className="h-screen flex flex-col items-center justify-center">
                    <p className='text-lg font-semibold p-3 text-red-600'>You don't have any Invoice</p>
                    <Link to={'/dashboard/new-invoice'} className='border p-3 bg-blue-700 text-white font-bold rounded-lg' >Create New Invoice</Link>
                </div>
            ) : (
                <div className="text-center font-bold text-lg">Loading..</div>
            )
            }
        </div>
    )
}
