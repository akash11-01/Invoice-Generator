// import { Chart } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebas';
Chart.register(...registerables);

export default function Home() {
    const [total, setTotal] = useState()
    const [totalMonthCollection, setTotalMonthCollection] = useState()
    const [invoices, setInvoices] = useState([])


    const createChart = (chartData) => {
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(chartData),
                datasets: [{
                    label: '# of Votes',
                    data: Object.values(chartData),
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
        getData()
    }, [])

    const getData = async () => {
        const q = query(collection(db, "invoice"), where('uid', "==", localStorage.getItem('uid'))) // filtering the invoice og particular user
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() //Har ek document ka data
        }))
        setInvoices(data);
        getOverllTotal();
        getMonthTotal();
        monthWiseData();
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

    const monthWiseData = () => {
        const chartData = {
            "January": 0,
            "February": 0,
            "March": 0,
            "April": 0,
            "May": 0,
            "June": 0,
            "July": 0,
            "August": 0,
            "September": 0,
            "October": 0,
            "November": 0,
            "December": 0
        }

        {
            invoices && invoices.forEach((data) => {
                if (new Date(data.date.seconds * 1000).getFullYear() == new Date().getFullYear()) { // getting the current Year
                    console.log(new Date(data.date.seconds * 1000).toLocaleDateString('default', { month: 'long' }))
                    // const chartDateKey = new Date(data.date.seconds * 1000).toLocaleDateString('default', { month: 'long' }) // this will return month's Name
                    chartData[new Date(data.date.seconds * 1000).toLocaleDateString('default', { month: 'long' })] += data.Total
                }
            })
            createChart(chartData)
        }
    }

    const getMonthTotal = () => {
        let mt = 0;
        {
            invoices && invoices.forEach((data) => {
                if (new Date(data.date.seconds * 1000).getMonth() == new Date().getMonth()) {
                    // console.log(data)
                    mt = mt + data.Total
                }
            })
            setTotalMonthCollection(mt)
        }
    }

    return (
        <div className='h-screen p-1'>
            <div className="h-[28%] w-full flex gap-3 justify-between">
                <div className="bg-blue-500 w-1/3 rounded-lg bg-gradient-to-r from-blue-300 to-blue-80 flex flex-col items-center justify-center">
                    <h1 className='text-3xl font-bold'>Rs {total}</h1>
                    <p className='font-semibold'>Overall</p>
                </div>
                <div className="bg-purple-600 w-1/3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-900 flex flex-col items-center justify-center">
                    <h1 className='text-3xl font-bold'>{invoices.length}</h1>
                    <p className='font-semibold'>Invoices</p>
                </div>
                <div className="bg-gray-800 w-1/3 rounded-lg bg-gradient-to-l from-gray-400 to-gray-700 flex flex-col items-center justify-center">
                    <h1 className='text-3xl font-bold'>Rs {totalMonthCollection}</h1>
                    <p className='font-semibold'>This Month</p>
                </div>
            </div>
            <div className="h-[57%] flex gap-10 mt-8">
                <div className="bg-white w-[65%] rounded-lg">
                    <canvas id="myChart"></canvas>
                </div>
                <div className="bg-white w-[35%] rounded-lg">
                    <p className='text-center p-4 bg-blue-700 font-semibold text-white border'>Recent Invoice List</p>
                    <div className="">
                        <div className="flex justify-between font-bold p-1">
                            <p>Customer Name</p>
                            <p>Date</p>
                            <p>Total</p>
                        </div>
                        {/* we dont have to show all invoice just show 5-6 */}
                        {[...invoices]
                            .sort((a, b) => b.date.seconds - a.date.seconds) // sorted in Newest to Oldest Invoice created
                            .map(data => (
                                <div className="flex justify-between p-1">
                                    <p>{data.to}</p>
                                    <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
                                    <p>{data.Total}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
