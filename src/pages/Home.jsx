import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebas';

Chart.register(...registerables);

export default function Home() {
    const [total, setTotal] = useState(0);
    const [totalMonthCollection, setTotalMonthCollection] = useState(0);
    const [invoices, setInvoices] = useState([]);
    const chartRef = useRef(null); // Store chart instance

    const createChart = (chartData) => {
        const ctx = document.getElementById('myChart')?.getContext('2d');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Create a new chart and store the instance
        chartRef.current = new Chart(ctx, {
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
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (invoices.length > 0) {
            getOverallTotal();
            getMonthTotal();
            monthWiseData();
        }
    }, [invoices]);

    const getData = async () => {
        const q = query(collection(db, "invoice"), where('uid', "==", localStorage.getItem('uid')));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setInvoices(data);
    };

    const getOverallTotal = () => {
        let t = invoices.reduce((sum, data) => sum + data.Total, 0);
        setTotal(t);
    };

    const getMonthTotal = () => {
        let mt = invoices.reduce((sum, data) =>
            new Date(data.date.seconds * 1000).getMonth() === new Date().getMonth() ? sum + data.Total : sum,
            0);
        setTotalMonthCollection(mt);
    };

    const monthWiseData = () => {
        const chartData = {
            "January": 0, "February": 0, "March": 0, "April": 0,
            "May": 0, "June": 0, "July": 0, "August": 0,
            "September": 0, "October": 0, "November": 0, "December": 0
        };

        invoices.forEach((data) => {
            if (new Date(data.date.seconds * 1000).getFullYear() === new Date().getFullYear()) {
                let monthName = new Date(data.date.seconds * 1000).toLocaleDateString('default', { month: 'long' });
                chartData[monthName] += data.Total;
            }
        });

        createChart(chartData);
    };

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
                    <div>
                        <div className="flex justify-between font-bold p-1">
                            <p>Customer Name</p>
                            <p>Date</p>
                            <p>Total</p>
                        </div>
                        {invoices.sort((a, b) => b.date.seconds - a.date.seconds).slice(0, 6).map((data, index) => (
                            <div key={index} className="flex justify-between p-1">
                                <p>{data.to}</p>
                                <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
                                <p>{data.Total}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
