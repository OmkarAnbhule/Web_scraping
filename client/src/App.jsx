import React, { useState } from 'react';
import Input from './components/Input.jsx';
import Product from './components/Product.jsx';
import { Toaster } from 'sonner';

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

    return (
        <div className='flex flex-col gap-y-10 select-none'>
            <Toaster position='top-center' richColors />
            <Input setProducts={setProducts} setProductUrls={setProductUrls} />
            <Product products={products} />
        </div>
    );
}