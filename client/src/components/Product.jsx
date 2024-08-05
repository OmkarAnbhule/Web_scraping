import React, { useState } from 'react';
import Card from './Card';

export default function Product({ products }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='w-full'>
            {products.length > 0 ? (
                <div>
                    <div className='flex w-full p-1 flex-wrap gap-2 justify-center'>
                        {currentProducts.map((product, index) => (
                            <Card key={index} title={product.title} image={product.image} caption={product.caption} url={product.url} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className='flex w-full py-4 px-2 justify-center gap-4 md:flex-row flex-col '>
                        <div className='min-w-1/2 flex justify-center'>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className='border-2 py-2 px-3 rounded-lg'
                                    style={{
                                        margin: '0 5px',
                                        backgroundColor: currentPage === index + 1 ? 'lightblue' : 'white',
                                    }}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <div className='flex min-w-1/2 px-4 gap-4 justify-center'>
                            <button className={`border-2 py-2 px-4 text-xl w-max h-max text-black rounded-md bg-blue-100 ${currentPage == 1 ? 'hidden' : 'block' }`} disabled={currentPage == 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                            <button className={`border-2 py-2 px-4 text-xl w-max h-max text-white rounded-md bg-blue-700 ${currentPage == totalPages ? 'hidden' : 'block' }`} disabled={currentPage == totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
}