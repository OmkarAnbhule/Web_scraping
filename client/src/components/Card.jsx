import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Modal from './Modal';

const ProductComponent = ({ image, title, caption, url }) => {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="md:w-1/2 w-full border-2 flex md:flex-nowrap flex-wrap flex-row">
            {loading ? (
                <>
                    <Skeleton height={160} width={160} className="flex-none object-cover object-top rounded-t lg:rounded-t-none lg:rounded-l" />
                    <div className="border-r w-full border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-8">
                            <Skeleton height={30} width={`80%`} className="mb-2" />
                            <Skeleton count={3} height={20} className="mb-1" />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <img
                        className={`h-40 md:w-40 w-full flex-none object-cover object-top rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden`}
                        src={image}
                        title={'image for ' + title}
                    />
                    <div className="border-r w-full border-b border-l hover:border-cyan-300 hover:shadow-xl shadow-black hover:bg-[rgba(255,255,255,0.53)] hover:backdrop-blur-md border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-8">
                            <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
                            <p className="text-gray-700 text-base">{caption}</p>
                        </div>
                        <div className='flex w-full justify-end'>
                            <button className='bg-yellow-300 w-max p-3 rounded-lg text-slate-900 hover:bg-yellow-700 hover:text-white' onClick={() => setOpen(true)}>Summarize</button>
                            <Modal open={open} setOpen={setOpen} url={url} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default ProductComponent;