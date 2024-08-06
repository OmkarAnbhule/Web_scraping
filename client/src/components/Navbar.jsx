import React from 'react'
import Github from '../assets/github-mark-white.svg'

export default function Navbar() {
    return (
        <div className='nav w-full h-max py-4 px-2 m-0 bg-slate-400 flex justify-between items-center fixed top-0 z-[9999]'>
            <div className='icon w-max h-max text-3xl font-semibold font-serif text-white flex items-center justify-center'>
                Scrape Shop
            </div>
            <div className='flex justify-center items-center'>
                <a href='https://github.com/OmkarAnbhule/Web_scraping' target='_blank' rel='noreferrer'>
                    <img src={Github} width={50} height={50}></img>
                </a>
            </div>
        </div>
    )
}
