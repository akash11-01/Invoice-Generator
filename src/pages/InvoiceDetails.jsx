import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function InvoiceDetails() {
    const location = useLocation(); //* getting the location sended from the invoices page (view)
    const [data, setData] = useState(location.state)
    // console.log(data.Total)

    const printInvoice = () => {
        const input = document.getElementById('invoice')
        html2canvas(input, { useCORS: true })   // capture the element as an image (basically takes a screenshot of input)
            .then((canvas) => {
                const imageData = canvas.toDataURL('image/png', 1.0)   // convert the captured image to png data url (1.0 ensures the highest quality image)

                //create a pdf document
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: [612, 792]
                })

                pdf.internal.scaleFactor = 1; //Ensures that the scaling factor is set to 1 to prevent any unexpected resizing issues.

                //Calculate the image dimensions for the PDF
                const imageProps = pdf.getImageProperties(imageData)
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHieght = (imageProps.height * pdfWidth) / imageProps.width

                //add the image to the pdf
                pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHieght)

                //save the pdf file
                pdf.save('invoice ' + new Date().toLocaleDateString())
            })
    }

    return (
        <div className='h-screen'>
            <div className="flex justify-end p-3">
                <button onClick={printInvoice} className='p-3 bg-pink-500 font-bold rounded-lg text-white'>Print Invoice</button>
            </div>
            <div id='invoice' className='w-[50%] h-[80%] mx-auto  bg-white'>
                <div className="flex ">
                    <div className="w-1/2 p-3 mx-4">
                        <img src={localStorage.getItem('photoURL')} alt="" className='w-[90px] h-[90px] rounded-full shadow-lg' />
                        <p className='uppercase font-bold text-lg mt-1'>{localStorage.getItem('cName')}</p>
                        <p cals>{localStorage.getItem('email')}</p>
                    </div>
                    <div className="w-1/2 p-3 ">
                        <p className='text-lg uppercase font-bold text-blue-700'>Invoice</p>
                        <p><span className='font-bold'>To:-</span> {data.to}</p>
                        <p><span className='font-bold'>Phone:-</span> {data.phone}</p>
                        <p><span className='font-bold'>Address:-</span> {data.address}</p>
                    </div>
                </div>
                <table className='w-[90%] mx-auto'>
                    <thead>
                        <tr className='border border-black bg-blue-600 border-b-2 border-t-2  text-white'>
                            <th className='border-r-2 border-l-2 border-black p-1'>S.No</th>
                            <th className='border-r-2 border-black p-1'>Product Name</th>
                            <th className='border-r-2 border-black p-1'>Price</th>
                            <th className='border-r-2 border-black p-1'>Quantity</th>
                            <th className='border-r-2 border-black p-1'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map((product, index) => (
                            <tr key={product.id} className='border border-black border-b-2'>
                                <td className='border-r-2 border-l-2 border-black p-1'>{index + 1}</td>
                                <td className='border-r-2 border-black p-1'>{product.name}</td>
                                <td className='border-r-2 border-black p-1'>{product.price}</td>
                                <td className='border-r-2 border-black p-1'>{product.quantity}</td>
                                <td className='border-r-2 border-black p-1'>{product.quantity * product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className='border border-black border-b-2 bg-blue-600 text-white font-bold'>
                            <td className='border-l-2 border-black p-1' >Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className='border-l-2 border-r-2 border-black p-1'>{data.Total}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>
    )
}
