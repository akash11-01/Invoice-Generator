// import { Chart } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebas';
Chart.register(...registerables);

export default function Home() {
    const [total, setTotal] = useState(123)
    const [totalInvoice, setTotalInvoice] = useState(432)
    const [totalMonthCollection, setTotalMonthCollection] = useState(2543)
    const [invoices, setInvoices] = useState()

    const createChart = () => {
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    useEffect(() => {
        // createChart()
        getData()
    }, [])

    const getData = async () => {
        const q = query(collection(db, "invoice"), where('uid', "==", localStorage.getItem('uid'))) // filtering the invoice og particular user
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() //Har ek document ka data
        }))
        setInvoices(data)
        getOverllTotal()
    }

    const getOverllTotal = () => {
        let t = 0;
        {
            invoices && invoices.forEach((data) => {
                t = t + data.Total
            })
        }
        setTotal(t)
    }




    return (
        <div className='h-screen p-1'>
            <div className="h-[28%] w-full flex gap-3 justify-between">
                <div className="bg-blue-500 w-1/3 rounded-lg bg-gradient-to-r from-blue-300 to-blue-80 flex flex-col items-center justify-center">
                    <h1 className='text-3xl font-bold'>Rs {total}</h1>
                    <p className='font-semibold'>Overall</p>
                </div>
                <div className="bg-purple-600 w-1/3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-900 flex flex-col items-center justify-center">
                    <h1 className='text-3xl font-bold'>{totalInvoice}</h1>
                    <p className='font-semibold'>Invoices</p>
                </div>
                <div className="bg-gray-800 w-1/3 rounded-lg bg-gradient-to-l from-gray-400 to-gray-700 flex flex-col items-center justify-center">
                    <h1 className='text-3xl font-bold'>Rs {totalMonthCollection}</h1>
                    <p className='font-semibold'>This Month</p>
                </div>
            </div>
            <div className="h-[57%] flex gap-10 mt-8">
                <div className="bg-white w-[60%] rounded-lg">
                    <canvas id="myChart"></canvas>
                </div>
                <div className="bg-white w-[40%] rounded-lg">
                    <p className='text-center p-4 bg-blue-700 font-semibold text-white border'>Recent Invoice List</p>
                    <div className="flex justify-evenly">
                        <p>Customer Name</p>
                        <p>{new Date().toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
