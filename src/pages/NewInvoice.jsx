import { addDoc, collection, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebas';
import { useNavigate } from 'react-router-dom';

export default function NewInvoice() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState('');
    const [to, setTo] = useState('')
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")

    const [products, setProducts] = useState([]);
    const [Total, setTotal] = use; State(0)
    const navigate = useNavigate(

    )
    const handleSubmit = (e) => {
        e.preventDefault();
        setProducts([...products, { 'id': products.length, 'name': productName, 'price': productPrice, 'quantity': productQuantity }])
        setProductName('')
        setProductPrice('')
        setProductQuantity('')
    }

    //calculating total billing price
    useEffect(() => {
        let totP = 0;
        products.map((data) => {
            totP += (data.price * data.quantity)
        })
        setTotal(totP)
    }, [products])

    //saving the details in databses
    const saveDetails = async () => {
        const data = await addDoc(collection(db, 'invoice'), {
            to: to,
            phone: phone,
            address: address,
            products: products,
            Total: Total,
            date: Timestamp.fromDate(new Date())
        })
        navigate('./dashoboard')
        console.log(data)
    }
    return (
        <div className="">
            <div className='ml-3 p-2'>
                <div className="mb-3 flex justify-between">
                    <h1 className='text-lg font-bold text-slate-900'>New Invoice</h1>
                    <button onClick={saveDetails} className='font-semibold border p-2 bg-zinc-500 text-white rounded-md'>Save Details</button>
                </div>
                <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                    <div className="flex gap-4 ">
                        <input
                            type="text"
                            placeholder='To'
                            className='w-full lg:w-1/2 border p-2 rounded-sm outline-slate-500'
                            onChange={(e) => setTo(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Phone'
                            className=' w-full lg:w-1/2 border p-2 rounded-sm outline-slate-500'
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Address'
                            className='w-full lg:w-1/2 border p-2 rounded-sm outline-slate-500'
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder='Product Name'
                            className='w-full lg:w-1/2 border p-2 rounded-sm outline-slate-500'
                            onChange={(e) => setProductName(e.target.value)}
                            value={productName}
                        />
                        <input
                            type="text"
                            placeholder='Price'
                            className='w-full lg:w-1/2 border p-2 rounded-sm outline-slate-500'
                            onChange={(e) => setProductPrice(e.target.value)}
                            value={productPrice}
                        />
                        <input
                            type="text"
                            placeholder='quantity'
                            className='w-full lg:w-1/2 border p-2 rounded-sm outline-slate-500'
                            onChange={(e) => setProductQuantity(e.target.value)}
                            value={productQuantity}
                        />
                    </div>

                    <div className=" flex justify-center mb-10">
                        <button type='submit' className='p-2 bg-blue-600 rounded-md text-white font-semibold'>Add Product</button>
                    </div>
                </form>
                {products.length > 0 ? (
                    <div className="bg-gray-50 p-2">
                        <div className="flex justify-between">
                            <p>S. No</p>
                            <p>Product Name</p>
                            <p>Price</p>
                            <p>Quantity</p>
                            <p>Total Price</p>

                        </div>
                        <div className=''>
                            {products.map((data, index) => (
                                <div className="flex justify-between" key={index}>
                                    <p className="">{index + 1}</p>
                                    <p className="">{data.name}</p>
                                    <p className="">{data.price}</p>
                                    <p className="">{data.quantity}</p>
                                    <p className="">{data.quantity * data.price}</p>
                                </div>
                            ))}
                            <p className='border border-blue-600 mt-2'></p>
                            <p className='text-end mt-1 text-blue-800 font-bold'>Total : ₹{Total}</p>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
