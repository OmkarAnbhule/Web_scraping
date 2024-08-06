import React, { useState } from 'react';
import Input from './components/Input.jsx';
import Product from './components/Product.jsx';
import Navbar from './components/Navbar.jsx';
import { Toaster } from 'sonner';
import NotFound from './assets/404.svg'
import Loading from './assets/search.svg'

// CORS Proxy Function
(function () {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function () {
        var args = slice.call(arguments);
        var targetUrl = args[1]; // The URL being requested

        // Check if the target URL is NOT the API endpoint
        if (!targetUrl.includes('https://webscrap-backend.vercel.app/api/chat')) {
            var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(targetUrl);
            if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
                targetOrigin[1] !== cors_api_host) {
                args[1] = cors_api_url + targetUrl; // Prepend CORS proxy URL
            }
        }

        return open.apply(this, args);
    };
})();

export default function App() {
    const [products, setProducts] = useState([]);
    const [productUrls, setProductUrls] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    return (
        <>
            <Toaster position='bottom-right' richColors />
            <div className='flex flex-col gap-y-10 select-none'>
                <Navbar />
                <div className='mt-24 gap-y-10 flex flex-col '>
                    <Input setProducts={setProducts} setProductUrls={setProductUrls} loading={loading} setLoading={setLoading} error={error} setError={setError} />
                    {
                        productUrls.length > 0 &&
                        <Product products={products} />
                    }
                    {
                        error &&
                        <div className='w-full h-full flex justify-center'>
                            <img src={NotFound} className='flex justify-center w-1/3' />
                        </div>
                    }
                    {
                        loading &&
                        <div className='w-full h-full flex justify-center'>
                            <img src={Loading} className='flex justify-center w-1/3' />
                        </div>
                    }
                </div>
            </div>
        </>
    );
}