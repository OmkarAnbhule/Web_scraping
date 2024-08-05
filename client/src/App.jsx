import React, { useState } from 'react'
import Input from './components/Input.jsx'
import Product from './components/Product.jsx'
import { Toaster } from 'sonner'
export default function App() {
    const [products, setProducts] = useState([])
    const [productUrls, setProductUrls] = useState([])
    return (
        <div className='flex flex-col gap-y-10 select-none'>
            <Toaster position='top-center' richColors />
            <Input setProducts={setProducts} setProductUrls={setProductUrls} />
            <Product products={products} />
        </div>
    )
}
