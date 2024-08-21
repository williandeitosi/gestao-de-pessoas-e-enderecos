'use client'

import { useState, ChangeEvent } from 'react'
import { MoonIcon, SunIcon, MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Avatar from '../assets/images/avatar.png'

export default function Navbar() {
    const [search, setSearch] = useState<string>('')
    const { theme, setTheme } = useTheme()

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    return (
        <nav className='bg-zinc-900 text-white p-4 shadow-lg col-span-12 row-span-1'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-center h-16  bg-zinc-900 cursor-pointer'>
                    <MapPinIcon className='h-12 w-12 text-yellow-300' />
                    <span className='ml-2 text-2xl font-semibold'>E-gest</span>
                </div>
                <div className='flex items-center rounded-lg bg-zinc-700 px-2 py-1 w-1/3'>
                    <MagnifyingGlassIcon className='h-5 w-5 text-zinc-400' />
                    <input
                        type="text"
                        placeholder='Search by full name, cep or more...'
                        className='bg-transparent ml-2 outline-none w-full'
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className='flex items-center space-x-4'>
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className='p-2 rounded-full hover:bg-zinc-700'
                    >
                        {theme === 'dark' ? (
                            <SunIcon className='h-7 w-7' />
                        ) : (
                            <MoonIcon className='h-7 w-7' />
                        )}
                    </button>
                    <Image
                        src={Avatar}
                        alt='Avatar'
                        className='rounded-full hover:bg-zinc-700 cursor-pointer'
                        width={56}
                        height={56}
                    />
                </div>
            </div>
        </nav>
    )
}
